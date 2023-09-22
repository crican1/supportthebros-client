import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

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

const createPostTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePostTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_tags?organizerPostId=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((data) => resolve(data))
    .catch(reject);
  console.warn(id);
});

const getTagsByOrganizerPostId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_tags?organizerPostId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deletePostTagByOrganizerId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_tags?organizer_post_id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const deletePostTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_tag/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});
export {
  getPostTags,
  getSinglePostTag,
  createPostTag,
  updatePostTag,
  getTagsByOrganizerPostId,
  deletePostTagByOrganizerId,
  deletePostTag,
};
