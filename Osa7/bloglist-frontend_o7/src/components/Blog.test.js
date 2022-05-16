import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  author: "God",
  id: "5123126512",
  likes: 14,
  title: "How to create earth 101",
  url: "urlilurli",
};

const mockLike = jest.fn();
const mockDelete = jest.fn();

beforeEach(() => {
  render(<Blog blog={blog} likeBlog={mockLike} deleteBlog={mockDelete} />);
});

test("renders short blog", async () => {
  screen.getByText("How to create earth 101 by God");
});

test("renders long blog after pressing button", async () => {
  const button = screen.getByText("View");
  await userEvent.click(button);

  screen.getByText("How to create earth 101");
  screen.getByText("author: God");
  screen.getByText("url: urlilurli");
  screen.getByText("likes: 14");
});

test("click like twice", async () => {
  const button = screen.getByText("View");
  await userEvent.click(button);

  const likebutton = screen.getByText("Like");
  await userEvent.click(likebutton);
  await userEvent.click(likebutton);

  expect(mockLike.mock.calls).toHaveLength(2);
});
