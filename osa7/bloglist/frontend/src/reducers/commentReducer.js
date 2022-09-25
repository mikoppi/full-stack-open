import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = {
  comments: null,
};

const userSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action) {
      console.log(action.payload);
      state.comments = action.payload;
    },
    appendComment(state, action) {
      const content = action.payload;
      state.push(content);
      return state;
    },
  },
});

export const { setComments, appendComment } = userSlice.actions;

export const getAllComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    console.log(comments);
    dispatch(setComments(comments));
  };
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.postComment(id, comment);
    dispatch(appendComment(newComment));
  };
};

export default userSlice.reducer;
