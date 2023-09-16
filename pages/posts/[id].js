/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Badge, Button, Card } from 'react-bootstrap';
import Head from 'next/head';
import { deletePost, getSinglePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';

const ViewPost = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [postDetails, setPostDetails] = useState({});
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => router.push('/posts'));
    }
  };

  useEffect(() => {
    getSinglePost(id).then((postData) => {
      setPostDetails(postData);
    });
  }, [id]);

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
        }}
      >
        <Card.Title> {postDetails.title}</Card.Title>
        <Card.Body>
          <img src={postDetails.post_image} alt="productimage" style={{ width: '200px' }} />
        </Card.Body>
        <Card.Body>
          <Card.Text> {postDetails.post_content} </Card.Text>
          <Card.Text>Goal: ${postDetails.goal}</Card.Text>
          <Badge bg="warning">{postDetails.tag}</Badge>
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
