// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { getPostTags } from '../../utils/data/postTagData';

// const initialState = {
//   organizerPostId: '',
//   tagId: '',
// };

// const PostTagForm = ({ postTagObj }) => {
//   const [currentPostTag, SetCurrentPostTag] = useState(initialState);
//   const router = useRouter();
//   const { id } = router.query;
//   const [formInput, setFormInput] = useState({ ...initialState, organizerPostId: id });
//   const tags = () => {
//     getPostTags().then((data) => setFormInput(data));
//     console.warn(tags);
//   };

//   useEffect(() => {
//     if (postTagObj.id) {
//       SetCurrentPostTag({
//         id: postTagObj.id,
//         organizerPostId: postTagObj.organizer_post_id,
//         tagId: postTagObj.tag_id,
//       });
//     }
//   }, [postTagObj]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({

//       ...prevState,
//       [name]: value,
//     }));

//     SetCurrentPostTag((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3">
//         <Form.Label>Tags</Form.Label>
//         <Form.Select
//           name="tag_id"
//           required
//           value={formInput.tagId.title}
//           onChange={handleChange}
//         >
//           <option value="">Select a Tag</option>
//           {tags.map(() => (
//             <option
//               key={`post_tags--${currentPostTag.id}`}
//               value={currentPostTag.id}
//               title={currentPostTag.title}
//             >
//               {currentPostTag.tagId}
//             </option>
//           ))}
//         </Form.Select>
//       </Form.Group>
//     </Form>
//   );
// };

// PostTagForm.propTypes = {
//   postTagObj: PropTypes.shape({
//     id: PropTypes.number,
//     organizer_post_id: PropTypes.number,
//     tag_id: PropTypes.string,
//   }),
// };

// PostTagForm.defaultProps = {
//   postTagObj: initialState,
// };

// export default PostTagForm;
