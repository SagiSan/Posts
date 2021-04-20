import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Comment } from "../Comment";

const props = {
  userName: "tester",
  text: "this is a test",
};

test("renders comment", () => {
  render(<Comment {...props} />);
  const username = screen.getByText("tester");
  const text = screen.getByText("this is a test");
  expect(username).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
