import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: false, // 👈 No object, just boolean
  reducers: {
    addDoctor: (state, action) => action.payload, // ✅ Takes true/false
    removeDoctor: () => false, // ✅ Always sets false
  },
});

export const { addDoctor, removeDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
