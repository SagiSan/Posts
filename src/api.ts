import { BASE_API_URL } from "./constants";
import { IPost } from "./types";
import { Actions } from "./constants";

export const getPosts = async (
  dispatch: (args: { type: string; payload: IPost[] }) => void
) => {
  try {
    const res = await fetch(`${BASE_API_URL}/posts`);
    const data = await res.json();
    return dispatch({
      type: Actions.GET_POSTS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUserName = async (
  userId: number,
  dispatch: (args: {
    type: string;
    payload: { userId: number; userName: string };
  }) => void
) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/${userId}`);
    const user = await res.json();
    return dispatch({
      type: Actions.GET_USER,
      payload: { userId: user.id, userName: user.name },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getComments = async (postId: number, dispatch: any) => {
  try {
    const res = await fetch(`${BASE_API_URL}/posts/${postId}/comments`);
    const comments = await res.json();
    return dispatch({
      type: Actions.GET_COMMENTS,
      payload: { postId, comments },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
