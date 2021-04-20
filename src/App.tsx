import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Posts as CleanPosts } from "./pages";
import { Post as CleanPost } from "./pages";
import { useStore } from "./store";
import { getComments, getPosts, getUserName } from "./api";
import { IPost } from "./types";
import { withWelcomeMessage } from "./HOC";

const Posts = withWelcomeMessage(CleanPosts);
const Post = withWelcomeMessage(CleanPost);

function App() {
  const {
    state: { posts, users },
    dispatch,
  } = useStore();
  React.useEffect(() => {
    getPosts(dispatch);
  }, []);

  React.useEffect(() => {
    let userIds: { [index: number]: number } = {};
    posts.forEach((post: IPost) => {
      userIds[post.userId] = post.userId;
      getComments(post.id, dispatch);
    });
    getUserNames(Object.values(userIds));
  }, [posts]);

  const getUserNames = async (userIds: number[]) => {
    for (let id of userIds) {
      if (!users[id]) {
        getUserName(id, dispatch);
      }
    }
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/posts/:id">
            <Post />
          </Route>
          <Route path="*">
            <Posts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export { App };
