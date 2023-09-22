import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { createPostTag, deletePostTag, getTagsByOrganizerPostId } from '../../utils/data/postTagData';
import { getTags } from '../../utils/data/tagData';
import { createPost, updatePost } from '../../utils/data/postData';

const initialState = {
  title: '',
  postImage: '',
  postContent: '',
  goal: '',
  createdOn: '',
};

// eslint-disable-next-line react/prop-types
export default function PostFormNoTags({ obj, postId }) {
  const [currentPost, SetCurrentPost] = useState(initialState);
  const [postTags, setPostTags] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  // const { id } = router.query;

  // console.warn(obj.id);
  // const getTagsThenSetSelected = () => {
  //   getTagsByOrganizerPostId(id).then(async (arr) => {
  //     await setSelectedTags(arr);
  //   });
  // };

  const getPostTagsAndDelete = () => {
    getTagsByOrganizerPostId(currentPost.id).then((data) => deletePostTag(data));
  };

  const getTagsThenSet = () => {
    getTags().then(setPostTags);
  };

  useEffect(() => {
    getTagsThenSet();
    if (obj.id) {
      SetCurrentPost({
        id: obj.id,
        title: obj.title,
        postImage: obj.post_image,
        postContent: obj.post_content,
        goal: obj.goal,
        createdOn: obj.created_on,
      });
    }
  }, [obj, postId]);

  console.warn(postTags);
  console.warn(currentPost);
  console.warn(selectedTags);

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
    getPostTagsAndDelete();
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
        // console.warn(payload);
        createPostTag(payload);
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
          <Button variant="info" type="submit">
            Submit
          </Button>
        </Form>
      </article>
    </>
  );
}

PostFormNoTags.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    post_image: PropTypes.string,
    post_content: PropTypes.string,
    created_on: PropTypes.string,
    goal: PropTypes.string,
    postId: PropTypes.number,
  }),
};

PostFormNoTags.defaultProps = {
  obj: initialState,
};
