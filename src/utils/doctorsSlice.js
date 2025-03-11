import { createSlice } from "@reduxjs/toolkit";

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: [],
  reducers: {
    addDoctors: (state, action) => action.payload,
  },
});
export const { addDoctors } = doctorsSlice.actions;
export default doctorsSlice.reducer;
