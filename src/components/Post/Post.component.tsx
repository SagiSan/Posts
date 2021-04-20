import * as React from "react";
import { IPost } from "../../types";
import "./Post.styles.css";

interface PostProps {
  post: IPost;
  userName: string;
  onPostClick?: () => void;
  type?: string;
}

const Post: React.FunctionComponent<PostProps> = ({
  post,
  userName,
  onPostClick,
  type = "view",
}) => {
  return (
    <div
      data-testid={`post-${post.id}`}
      className={`Post ${type}`}
      onClick={type === "list" ? onPostClick : undefined}
    >
      <div className="post-header">
        <img
          height={type === "list" ? "50" : "100"}
          width={type === "list" ? "50" : "100"}
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkooledge.com%2Fassets%2Fdefault_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png&f=1&nofb=1"
        />
        <span className={`user-name ${type}`}>{userName}</span>
      </div>
      <p className={`post-body ${type}`}>{post.body}</p>
    </div>
  );
};

export { Post };
