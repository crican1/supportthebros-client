import { clientCredentials } from '../client';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createPost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updatePost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getUserForPosts = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const userForPosts = Object.values(data).filter((post) => post.uid === uid);
      resolve(userForPosts);
    })
    .catch(reject);
});

export {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  getUserForPosts,
};
