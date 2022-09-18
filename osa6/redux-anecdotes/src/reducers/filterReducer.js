import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    placeFilter(state, action) {
      return action.payload ;
    },
  },
});

export const {placeFilter} = filterSlice.actions
export default filterSlice.reducer;
