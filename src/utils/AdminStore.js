import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "./allDoctorsSlice";
import doctorReducer from "./doctorSlice";
import adminReducer from "./adminSlice";
const adminStore = configureStore({
  reducer: {
    doctors: doctorsReducer,
    doctor: doctorReducer,
    admin: adminReducer,
  },
});
export default adminStore;
