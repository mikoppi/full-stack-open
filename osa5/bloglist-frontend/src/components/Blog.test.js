import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import Details from "./Details";

const blog = {
  title: "test-title",
  author: "test-author",
  url: "test-url",
  likes: 2,
  user: {
    username: "tester",
    name: "test tester",
  },
};

const user = {
  username: "tester",
  name: "test tester",
};

test("renders blogs without showing likes and url", () => {
  const { container } = render(<Blog blog={blog} user={user} />);
  const div = container.querySelector("#blog");
  expect(div).toHaveTextContent(blog.title);
  expect(div).toHaveTextContent(blog.author);
  expect(div).not.toHaveTextContent(blog.url);
  expect(div).not.toHaveTextContent(blog.likes);
});

test("url and likes show when button is clicked", () => {
  const { container } = render(<Blog blog={blog} user={user} />);
  const div = container.querySelector("#blog-details");
  const button = screen.getByText("view");
  userEvent.click(button);

  expect(div).toHaveTextContent(blog.url);
  expect(div).toHaveTextContent(blog.likes);
});

test("event handler is called twice when like button is clicked twice", async () => {
  const mockHandler = jest.fn();
  render(<Details blog={blog} updateBlog={mockHandler} user={user} />);
  const testUser = userEvent.setup();
  const button = screen.getByText("like");
  await testUser.click(button);
  await testUser.click(button);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
