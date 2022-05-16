import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";
import blogService from "../services/blogsService";

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const blogs = await blogsService.postNew(content);
    dispatch(setBlogs(blogs));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogsService.deleteBlog(id);
    dispatch(setBlogs(blogs));
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const blogs = await blogService.updateBlog(blog.id, blog);
    dispatch(setBlogs(blogs));
  };
};

export const { setBlogs, appendBlogs } = blogSlice.actions;
export default blogSlice.reducer;
