import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTagsByPostId } from '../../utils/data/postTagData';
import PostTagCard from '../../components/postTag/PostTagCard';

export default function PostTags() {
  const [posttags, setPostTags] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getAllPostTags = () => {
    getTagsByPostId(id).then((data) => setPostTags(data));
  };

  useEffect(() => {
    getAllPostTags();
  }, []);

  return (
    (posttags.map((posttag) => (
      <section key={`post_tag--${posttag.id}`} className="post_tag">
        <PostTagCard
          id={posttag.id}
          organizerPostId={posttag.organizer_post_id}
          tagId={posttag.tag_id.title}
          onUpdate={getAllPostTags}
        />
      </section>
    )))
  );
}
