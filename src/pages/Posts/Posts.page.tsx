import * as React from "react";
import "./Posts.styles.css";
import { useStore } from "../../store";
import { IPost } from "../../types";
import { useHistory } from "react-router";
import { PostWrapper as CleanPostWrapper } from "../../components";
import { withWelcomeMessage } from "../../HOC";
import { Search } from "../../components";

const PostWrapper = withWelcomeMessage(CleanPostWrapper);

const Posts: React.FunctionComponent = () => {
  const {
    state: { posts, users, comments },
  } = useStore();

  const history = useHistory();
  const [search, setSearch] = React.useState("");

  const onPostClick = (postId: number) => {
    history.push(`/posts/${postId}`);
  };

  const datalist: string[] = Object.values(users);

  return (
    <div className="PostsPage">
      <h1 className="posts-header">Q agency Posts</h1>
      <Search
        search={search}
        datalist={datalist}
        onChange={(e) => setSearch(e.target.value)}
      />
      {posts
        ?.filter((p: IPost) =>
          users[p.userId]?.toLowerCase().includes(search.toLowerCase())
        )
        .map((post: IPost) => (
          <PostWrapper
            type="list"
            key={post.id}
            post={post}
            userName={users[post.userId]}
            onPostClick={() => onPostClick(post.id)}
            comments={comments[post.id]}
          />
        ))}
    </div>
  );
};

export { Posts };
