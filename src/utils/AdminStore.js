import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "./allDoctorsSlice";
const adminStore = configureStore({
  reducer: {
    doctors: doctorsReducer,
  },
});
export default adminStore;
