/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Button, Card,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getPosts } from '../../utils/data/postData';
import { getTagsByOrganizerPostId } from '../../utils/data/postTagData';
import PostTagCard from '../postTag/PostTagCard';

const PostCard = ({
  id,
  title,
  postImage,
  postContent,
  goal,
  createdOn,
  // tagId,
}) => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [userPosts, setUserPosts] = useState({});
  const [postTags, setPostTags] = useState([]);

  const showPosts = () => {
    getPosts().then((data) => setUserPosts(data));
  };

  const getAllPostTags = async () => {
    const tags = await getTagsByOrganizerPostId(id);
    setPostTags(tags);
  };

  useEffect(() => {
    showPosts();
    getAllPostTags();
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
          <Card.Body>Tags: {postTags.map((postTag) => (
            <section key={`post_tag--${postTag.id}`} className="post_tag">
              <PostTagCard
                tagId={postTag.tag_id.title}
                onUpdate={getAllPostTags}
              />
            </section>
          ))}
          </Card.Body>
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
  // tagId: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  // }).isRequired,
};

export default PostCard;
