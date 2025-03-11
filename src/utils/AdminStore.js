import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "../utils/doctorsSlice";
const AdminStore = configureStore({
  reducer: {
    doctors: doctorsReducer,
  },
});
export default AdminStore;
