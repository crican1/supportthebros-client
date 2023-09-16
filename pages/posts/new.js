import PostForm from '../../components/posts/PostForm';
import { useAuth } from '../../utils/context/authContext';

const NewPost = () => {
  const { user } = useAuth();
  return (
    <div>
      <PostForm user={user} />
    </div>
  );
};

export default NewPost;
