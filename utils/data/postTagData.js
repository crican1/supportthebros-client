import { clientCredentials } from '../client';

const getPostTags = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_tags`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePostTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_tags/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updatePostTag = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_tags/${postId.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postId),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getTagsByOrganizerPostId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts?organizerPostId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getPostTags,
  getSinglePostTag,
  updatePostTag,
  getTagsByOrganizerPostId,
};
