import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

const PostTagCard = ({
  tagId,
}) => (
  <Badge bg="warning">{tagId}</Badge>
);

console.warn(PostTagCard);

PostTagCard.propTypes = {
  tagId: PropTypes.string.isRequired,
};

export default PostTagCard;
