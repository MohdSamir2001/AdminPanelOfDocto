import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: false,
  reducers: {
    addAdmin: (state, action) => true,
    removeAdmin: (state, action) => false,
  },
});

export const { addAdmin, removeAdmin } = adminSlice.actions;
export default adminSlice.reducer;
