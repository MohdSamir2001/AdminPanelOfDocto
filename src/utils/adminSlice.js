import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: false, // 👈 Directly use boolean instead of an object
  reducers: {
    addAdmin: (state, action) => action.payload, // ✅ Use payload to set true/false
    removeAdmin: () => false, // ✅ Always sets false
  },
});

export const { addAdmin, removeAdmin } = adminSlice.actions;
export default adminSlice.reducer;
