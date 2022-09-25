import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const initialState = {
  user: null,
  userList: null,
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
    getAllUsers(state, action) {
      console.log(action.payload);
      state.userList = action.payload;
    },
  },
});

export const { getUser, getAllUsers, removeUser } = userSlice.actions;

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

export const getUserList = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    console.log(users);
    dispatch(getAllUsers(users));
  };
};

export default userSlice.reducer;
