import * as React from "react";
import { useStore } from "../../store";
import "./Post.styles.css";
import { useParams } from "react-router";
import { IPost } from "../../types";
import { PostWrapper as CleanPostWrapper } from "../../components/PostWrapper/PostWrapper.component";
import { withWelcomeMessage } from "../../HOC";

const PostWrapper = withWelcomeMessage(CleanPostWrapper);

const Post: React.FunctionComponent = () => {
  const {
    state: { users, posts, comments },
  } = useStore();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = React.useState<IPost | null>(null);
  React.useEffect(() => {
    const p = posts.find((el: IPost) => el.id === parseInt(id));
    if (p) {
      setPost(p);
    }
  }, [id, posts]);

  return (
    <div className="PostPage">
      {post ? (
        <PostWrapper
          key={post.id}
          post={post}
          userName={users[post.userId]}
          comments={comments[post.id]}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export { Post };
