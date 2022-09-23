import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const { getUser, getToken, removeUser } = userSlice.actions;

export const getUserInfo = (user) => {
  return (dispatch) => {
    dispatch(getUser(user));
  };
};

export const deleteUser = () => {
  return async (dispatch) => {
    const user = await userService.clearUser();
    dispatch(removeUser(user));
  };
};

export default userSlice.reducer;
