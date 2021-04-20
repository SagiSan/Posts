import React from "react";
import { IPost } from "./types";
import { Actions } from "./constants";

interface IState {
  posts: IPost[] | [];
  users: {};
  comments: {};
}
const initialState: IState = {
  posts: [],
  users: {},
  comments: {},
};

interface IContext {
  state: IState;
  dispatch: () => void;
}

export const Store = React.createContext<IContext | {}>({});
export const useStore = () => React.useContext<any>(Store);

function reducer(state: IState, action: { type: string; payload: any }) {
  switch (action.type) {
    case Actions.GET_POSTS:
      return { ...state, posts: action.payload };
    case Actions.GET_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: action.payload.userName,
        },
      };
    case Actions.GET_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const val = { state, dispatch };
  return <Store.Provider value={val}>{props.children}</Store.Provider>;
}
