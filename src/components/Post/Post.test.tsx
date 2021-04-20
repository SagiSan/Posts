import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Post } from "../Post";

const props = {
  post: {
    body: "body text",
    id: 1,
    title: "title text",
    userId: 2,
  },
  userName: "tester",
  onPostClick: jest.fn(),
  type: "list",
};

test("renders Post", () => {
  render(<Post {...props} />);
  const username = screen.getByText("tester");
  const body = screen.getByText("body text");
  expect(username).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});

test("on click post calls onPostClick prop", () => {
  render(<Post {...props} />);
  const post = screen.getByTestId("post-1");
  expect(post).toBeInTheDocument();
  fireEvent.click(post);
  expect(props.onPostClick).toBeCalled();
});
test("no onPostClick when list view", () => {
  render(<Post {...props} type="view" />);
  const post = screen.getByTestId("post-1");
  expect(post).toBeInTheDocument();
  fireEvent.click(post);
  expect(props.onPostClick).not.toBeCalled();
});
