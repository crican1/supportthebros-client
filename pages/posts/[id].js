/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Head from 'next/head';
import { deletePost, getSinglePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';
import { getTagsByOrganizerPostId } from '../../utils/data/postTagData';
import PostTagCard from '../../components/postTag/PostTagCard';

const ViewPost = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [postDetails, setPostDetails] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const { id } = router.query;

  console.warn(postTags);

  const deleteThisPost = () => {
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => router.push('/posts'));
    }
  };

  const getAllPostTags = async () => {
    const tags = await getTagsByOrganizerPostId(id);
    setPostTags(tags);
  };

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
    getAllPostTags();
  }, [id, setPostTags]);

  console.warn(postDetails);
  return (
    <>
      <Head>
        <title>{postDetails.title}</title>
      </Head>
      <Card
        className="text-center"
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0.4)',
          color: 'white',
          marginTop: '20px',
        }}
      >
        <Card.Title> {postDetails.title}</Card.Title>
        <Card.Body>
          <img src={postDetails.post_image} alt="productimage" style={{ width: '200px' }} />
        </Card.Body>
        <Card.Body>
          <Card.Text> {postDetails.post_content} </Card.Text>
          <Card.Text>Goal: ${postDetails.goal}</Card.Text>
          <Card.Body>Tags: {postTags.map((postTag) => (
            <section key={`post_tag--${postTag.id}`} className="post_tag">
              <PostTagCard
                tagId={postTag.tag_id.title}
                onUpdate={getAllPostTags}
              />
            </section>
          ))}
          </Card.Body>
          <Card.Footer>Created On: {postDetails.created_on}</Card.Footer>
        </Card.Body>
        { user.uid === postDetails.uid
          ? (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  router.push(`/posts/edit/${id}`);
                }}
              >
                Edit Post
              </Button>
              <Button
                variant="danger"
                onClick={deleteThisPost}
              >
                Delete Post
              </Button>
            </>
          ) : ''}
      </Card>
    </>
  );
};

export default ViewPost;
