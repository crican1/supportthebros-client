import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    profile_image_url: '',
    email: '',
    registered_organizer: false,
    uid: user.uid,
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        profile_image_url: user.profile_image_url || '',
        email: user.email || '',
        uid: user.uid || '',
      }));
    }
  }, [user]);

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
        <Form.Check
          className="organizer"
          type="switch"
          id="registered_organizer"
          name="registered_organizer"
          label="Registered Oraganizer"
          checked={formData.registered_organizer}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              registered_organizer: e.target.checked,
            }));
          }}
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
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile_image_url: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
