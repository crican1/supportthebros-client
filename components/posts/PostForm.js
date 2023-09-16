import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Head from 'next/head';
import { createPost, updatePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  postImage: '',
  postContent: '',
  goal: '',
  createdOn: '',
  tag: '',
};

const PostForm = ({ obj }) => {
  const [currentPost, SetCurrentPost] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const tag = [
    { id: 1, name: 'Health' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Education' },
    { id: 4, name: 'Disaster Relief' },
    { id: 5, name: 'Animals' },
    { id: 6, name: 'Environment' },
    { id: 7, name: 'Art' },
    { id: 8, name: 'Homelessness' },
    { id: 9, name: 'Food' },
    { id: 10, name: 'Politics' },
  ];

  useEffect(() => {
    if (obj.id) {
      SetCurrentPost({
        id: obj.id,
        title: obj.title,
        postImage: obj.post_image,
        postContent: obj.post_content,
        goal: obj.goal,
        createdOn: obj.created_on,
        tag: obj.tag,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetCurrentPost((prevState) => ({
      // TAKES WHATEVER THE PREVIOUS VALUE WAS.
      ...prevState,
      [name]: value,
    }));
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
        tag: currentPost.tag,
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
        tag: currentPost.tag,
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
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Select
              name="tag"
              required
              value={currentPost.tag}
              onChange={handleChange}
            >
              <option value="">Select a Tag</option>
              {tag.map((tags) => (
                <option
                  key={tags.id}
                  value={tags.name}
                >
                  {tags.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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
    tag: PropTypes.string,
    goal: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
