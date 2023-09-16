import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPosts } from '../../utils/data/postData';
import PostCard from '../../components/posts/PostCard';
import { useAuth } from '../../utils/context/authContext';

function Posts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const showPosts = () => {
    getPosts().then((data) => setPosts(data));
  };
  useEffect(() => {
    showPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <article className="posts text-center">
        <h1>Posts</h1>
        { user.registered_organizer === true
          ? (
            <Button
              variant="light"
              style={{ marginBottom: '10px' }}
              onClick={() => {
                router.push('/posts/new');
              }}
            >
              Create New Post
            </Button>
          ) : ''}
        {posts.map((post) => (
          <section key={`post--${post.id}`} className="post">
            <PostCard
              id={post.id}
              title={post.title}
              postImage={post.post_image}
              postContent={post.post_content}
              goal={post.goal}
              createdOn={post.created_on}
              tag={post.tag}
              uid={user.uid}
              onUpdate={showPosts}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Posts;
