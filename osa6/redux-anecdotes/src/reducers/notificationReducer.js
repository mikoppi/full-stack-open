import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload ;
    },
  },
});

export const {showNotification} = notificationSlice.actions;

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(showNotification(""))
        }, time*1000)
    }
}

export default notificationSlice.reducer;
