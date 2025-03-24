import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Admin/Dashboard";
import AllAppointments from "../pages/Admin/AllAppointments";
import AddDoctor from "../pages/Admin/AddDoctor";
import DoctorsList from "../pages/Admin/DoctorsList";
import Login from "../pages/Login";
import MedicinesList from "../pages/Admin/MedicinesList";
import AddMedicine from "../pages/Admin/AddMedicine";
import AdminOrdersPage from "../pages/Admin/AdminOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../utils/adminSlice";
import { addDoctor } from "../utils/doctorSlice";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get(BACKEND_URL + "/api/admin/get-admin", {
        withCredentials: true,
      });
      if (data?.message === "Admin is logged in") {
        dispatch(addAdmin(true));
      }
    } catch (error) {
      console.error("Admin fetch error:", error);
    }
  };
  const fetchDoctor = async () => {
    try {
      const { data } = await axios.get(BACKEND_URL + "/api/doctor/get-doctor", {
        withCredentials: true,
      });
      if (data?.message === "Doctor is logged in") {
        dispatch(addDoctor(true));
      }
    } catch (error) {
      console.error("Doctor fetch error:", error);
    }
  };
  useEffect(() => {
    axios
      .get(BACKEND_URL + "/api/admin/check-login", { withCredentials: true })
      .then(({ data }) => {
        if (data.role === "admin") {
          fetchAdmin();
        } else if (data.role === "doctor") {
          fetchDoctor();
        }
      })
      .catch((error) => console.error("Login check error:", error));
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Protected Routes inside HomePage */}
        <Route path="/" element={<HomePage />}>
          <Route index element={<Dashboard />} /> {/* Default route */}
          <Route path="admin-dashboard" element={<Dashboard />} />
          <Route path="medicine-list" element={<MedicinesList />} />
          <Route path="orders-list" element={<AdminOrdersPage />} />
          <Route path="all-appointments" element={<AllAppointments />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="add-medicine" element={<AddMedicine />} />
          <Route path="doctor-list" element={<DoctorsList />} />
        </Route>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
