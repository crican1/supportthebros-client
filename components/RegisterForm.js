import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    profile_image_url: '',
    email: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          as="textarea"
          name="first_name"
          required
          value={formData.first_name}
          placeholder="First Name"
          onChange={handleChange}
        />
        <Form.Control
          as="textarea"
          name="last_name"
          required
          value={formData.last_name}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <Form.Control
          type="url"
          name="profile_image_url"
          required
          value={formData.profile_image_url}
          placeholder="Enter a Profile Image"
          onChange={handleChange}
        />
        <Form.Control
          type="email"
          name="email"
          required
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    profile_image_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
