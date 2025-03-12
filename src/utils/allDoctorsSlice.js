import { createSlice } from "@reduxjs/toolkit";
const allDoctorsSlice = createSlice({
  name: "doctors",
  initialState: [],
  reducers: {
    addDoctors: (state, action) => action.payload,
  },
});
export const { addDoctors } = allDoctorsSlice.actions;
export default allDoctorsSlice.reducer;
