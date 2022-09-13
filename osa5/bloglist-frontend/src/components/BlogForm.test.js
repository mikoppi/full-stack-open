import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("correct data is given to forms callback function", async () => {
  const user = userEvent.setup();
  const addBlog = jest.fn();

  render(<BlogForm createBlog={addBlog} />);

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");
  const sendButton = screen.getByText("submit");

  await user.type(titleInput, "title test");
  await user.type(authorInput, "author test");
  await user.type(urlInput, "url test");

  await user.click(sendButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("title test");
  expect(addBlog.mock.calls[0][0].author).toBe("author test");
  expect(addBlog.mock.calls[0][0].url).toBe("url test");
  
});
