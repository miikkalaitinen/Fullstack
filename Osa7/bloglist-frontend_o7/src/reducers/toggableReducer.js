import { createSlice } from "@reduxjs/toolkit";

const toggableSlice = createSlice({
  name: "blog",
  initialState: false,
  reducers: {
    toggle(state, action) {
      return !state;
    },
  },
});

export default toggableSlice.reducer;
export const { toggle } = toggableSlice.actions;
