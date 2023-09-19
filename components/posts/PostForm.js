import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Head from 'next/head';
import { createPost, updatePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';
import { getTags } from '../../utils/data/tagData';
import { createPostTag, getTagsByOrganizerPostId, updatePostTag } from '../../utils/data/postTagData';

const initialState = {
  id: '',
  title: '',
  postImage: '',
  postContent: '',
  goal: '',
  createdOn: '',
  tagId: '',
};

// eslint-disable-next-line react/prop-types
export default function PostForm({ obj, postId }) {
  const [currentPost, SetCurrentPost] = useState(initialState);
  const [postTags, setPostTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  console.warn(id);
  const getTagsThenSetSelected = () => {
    getTagsByOrganizerPostId(id).then(async (arr) => {
      await setSelectedTags(arr);
    });
  };

  const getTagsThenSet = () => {
    getTags(id).then(setPostTags);
  };

  useEffect(() => {
    getTagsThenSetSelected(obj.id);
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
  }, [obj, postId]);

  // console.warn(postTags);
  console.warn(selectedTags);
  // console.warn(currentPost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetCurrentPost((prevState) => ({
      // TAKES WHATEVER THE PREVIOUS VALUE WAS.
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (tagId) => {
    if (selectedTags.some((tag) => tag.id === tagId)) {
      setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
    } else {
      const tags = postTags.filter((tag) => tag.id === tagId);
      setSelectedTags([...selectedTags, tags[0]]);
    }
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (obj.id) {
      const updatePostWithPostTags = async () => {
        const postUpdate = {
          id: obj.id,
          title: currentPost.title,
          postImage: currentPost.postImage,
          postContent: currentPost.postContent,
          goal: currentPost.goal,
          tagId: currentPost.tagId,
        };
        await updatePost(postUpdate);
        const tagIds = [];
        selectedTags.forEach((tags) => {
          tagIds.push(tags.id);
        });
        const payload = {
          tagIds,
          organizerPostId: currentPost.id,
        };
        console.warn(payload);
        updatePostTag(payload);
        router.push('/posts');
      };
      updatePostWithPostTags();
    } else {
      const createPostWithPostTags = async () => {
        const posts = {
          id: obj.id,
          title: currentPost.title,
          postImage: currentPost.postImage,
          postContent: currentPost.postContent,
          goal: currentPost.goal,
          tagId: currentPost.tagId,
          uid: user.uid,
        };
        const newPost = await createPost(posts);
        const tagIds = [];
        selectedTags.forEach((tag) => {
          tagIds.push(tag.id);
        });
        const payload = {
          tagIds,
          organizerPostId: newPost.id,
        };
        createPostTag(payload);
        router.push('/posts');
      };
      createPostWithPostTags();
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
            <div className="form-check" key={postTag.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={postTag.id}
                id={`tag-${postTag.id}`}
                checked={selectedTags.some((tags) => tags.id === postTag.id)}
                onChange={() => handleCheckboxChange(postTag.id)}
              />
              <label className="form-check-label" htmlFor={`posttag-${postTag.id}`}>
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
}

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
    postId: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
