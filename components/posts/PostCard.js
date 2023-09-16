/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Badge,
  Button, Card,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getPosts } from '../../utils/data/postData';

const PostCard = ({
  id,
  title,
  postImage,
  postContent,
  goal,
  createdOn,
  tag,
}) => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [userPosts, setUserPosts] = useState({});

  const showPosts = () => {
    getPosts().then((data) => setUserPosts(data));
  };
  useEffect(() => {
    showPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card
        className="postCard text-center"
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0.4)',
          color: 'white',
        }}
      >
        <Card.Title>{title}</Card.Title>
        <Card.Body>
          <img src={postImage} alt="postimage" style={{ width: '200px' }} />
        </Card.Body>
        <Card.Body>
          <Card.Text>{postContent}</Card.Text>
          <Card.Text>Goal: ${goal}</Card.Text>
          <Badge bg="warning">{tag}</Badge>
          <Card.Footer>Created On: {createdOn}</Card.Footer>
        </Card.Body>
        <Button
          variant="secondary"
          onClick={() => {
            router.push(`/posts/${id}`);
          }}
        >
          View Post
        </Button>
      </Card>
    </>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  postImage: PropTypes.string.isRequired,
  postContent: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default PostCard;
