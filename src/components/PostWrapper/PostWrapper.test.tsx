import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostWrapper } from "../index";

const props = {
  post: {
    body: "body text",
    id: 1,
    title: "title text",
    userId: 2,
  },
  userName: "tester",
  onPostClick: jest.fn(),
  type: "view",
  comments: [
    {
      body: "body comment",
      email: "test@gmail.com",
      id: 3,
      postId: 1,
      name: "test",
    },
  ],
};

test("no comments when type view", () => {
  render(<PostWrapper {...props} />);
  const showComments = screen.queryByText("Show comments");
  const hideComments = screen.queryByText("Hide comments");
  const comment = screen.queryByText("body comment");
  expect(showComments).not.toBeInTheDocument();
  expect(hideComments).not.toBeInTheDocument();
  expect(comment).toBeInTheDocument();
});

test("comments when type list", () => {
  render(<PostWrapper {...props} type="list" />);
  const hideComments = screen.queryByText("Hide comments");
  const comment = screen.queryByText("body comment");
  expect(hideComments).toBeInTheDocument();
  expect(comment).toBeInTheDocument();

  const btn = screen.getByTestId("toggle-comments");
  fireEvent.click(btn);
  const showComments = screen.queryByText("Show comments");
  expect(showComments).toBeInTheDocument();
  expect(comment).not.toBeInTheDocument();
});
