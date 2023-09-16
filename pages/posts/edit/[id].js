import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/posts/PostForm';

export default function EditPostPage() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditPost);
  }, [id]);
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <div>
        <PostForm obj={editPost} />
      </div>
    </>
  );
}
