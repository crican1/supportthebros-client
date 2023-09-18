import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Head from 'next/head';
import { createPost, updatePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';
import { getTags } from '../../utils/data/tagData';
import { getTagsByOrganizerPostId } from '../../utils/data/postTagData';

const initialState = {
  title: '',
  postImage: '',
  postContent: '',
  goal: '',
  createdOn: '',
  tagId: 0,
};

// eslint-disable-next-line react/prop-types
const PostForm = ({ obj, organizerPostId }) => {
  const [currentPost, SetCurrentPost] = useState(initialState);
  const [postTags, setPostTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getTagsThenSetSelected = () => {
    getTagsByOrganizerPostId(organizerPostId).then(async (arr) => {
      await setSelectedTags(arr);
    });
  };

  const getTagsThenSet = () => {
    getTags().then(setPostTags);
  };

  useEffect(() => {
    getTagsThenSetSelected();
    getTagsThenSet();
    if (obj.id) {
      SetCurrentPost({
        id: obj.id,
        title: obj.title,
        postImage: obj.post_image,
        postContent: obj.post_content,
        goal: obj.goal,
        createdOn: obj.created_on,
        tagId: obj.tag_id?.id,
      });
    }
  }, [obj, organizerPostId]);

  console.warn(selectedTags);
  console.warn(organizerPostId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetCurrentPost((prevState) => ({
      // TAKES WHATEVER THE PREVIOUS VALUE WAS.
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (tagId) => {
    if (selectedTags.some((eng) => eng.id === tagId)) {
      // if the engineer is already included in the array,
      // we create a new array using .filter that includes every engineer
      // except for the engineer who was deselected
      setSelectedTags(selectedTags.filter((eng) => eng.id !== tagId));
    } else {
      // if the engineer is not already included in the array,
      // we use the spread operator to include the selected engineers
      // and we add the newly selected engineer to the array
      const tags = postTags.filter((eng) => eng.id === tagId);
      setSelectedTags([...selectedTags, tags[0]]);
    }
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (obj.id) {
      const postUpdate = {
        id: obj.id,
        title: currentPost.title,
        postImage: currentPost.postImage,
        postContent: currentPost.postContent,
        goal: currentPost.goal,
        tagId: currentPost.tagId,
      };

      updatePost(postUpdate)
        .then(() => router.push(`/posts/${id}`));
    } else {
      const posts = {
        id: obj.id,
        title: currentPost.title,
        postImage: currentPost.postImage,
        postContent: currentPost.postContent,
        goal: currentPost.goal,
        tagId: currentPost.tagId,
        uid: user.uid,
      };
      createPost(posts).then(() => router.push('/posts'));
    }
  };

  return (
    <>
      <article className="postForm">
        <Head>
          <title>Post Form</title>
        </Head>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-white mt-5 text-center">{obj.id ? 'Update' : 'Create'} Post</h2>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              required
              value={currentPost.title}
              onChange={handleChange}
              type="string"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Post Image</Form.Label>
            <Form.Control
              name="postImage"
              required
              value={currentPost.postImage}
              onChange={handleChange}
              type="string"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Post Content</Form.Label>
            <Form.Control
              as="textarea"
              name="postContent"
              required
              value={currentPost.postContent}
              onChange={handleChange}
              type="string"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Goal</Form.Label>
            <Form.Control
              name="goal"
              required
              value={currentPost.goal}
              onChange={handleChange}
              type="string"
            />
          </Form.Group>
          <Form.Label>Tags</Form.Label>
          {postTags.map((postTag) => (
            <div className="form-check" key={currentPost.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={postTag.id}
                id={`tag-${postTag.id}`}
                checked={selectedTags.some((tags) => tags.id === postTag.id)}
                onChange={() => handleCheckboxChange(postTag.id)}
              />
              <label className="form-check-label" htmlFor={`tag-${postTag.id}`}>
                {postTag.title}
              </label>
            </div>
          ))}
          <Button variant="info" type="submit">
            Submit
          </Button>
        </Form>
      </article>
    </>
  );
};

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    post_image: PropTypes.string,
    post_content: PropTypes.string,
    created_on: PropTypes.string,
    tag_id: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    goal: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
