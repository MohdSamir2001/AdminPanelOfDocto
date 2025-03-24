import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: false,
  reducers: {
    addDoctor: (state, action) => true,
    removeDoctor: (state, action) => false,
  },
});

export const { addDoctor, removeDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
