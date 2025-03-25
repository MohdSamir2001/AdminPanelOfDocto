import React, { useEffect, useState } from "react";
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
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import DocDashboard from "../pages/Doctor/DocDashboard";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const aToken = useSelector((store) => store.admin);
  const dToken = useSelector((store) => store.doctor);
  const [loading, setLoading] = useState(true); // Prevents UI flickering
  useEffect(() => {
    async function fetchTokens() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/admin/get-tokens`,
          {
            withCredentials: true,
          }
        );

        console.log("API Response:", response.data); // Debug response in Console

        const { adminToken, doctorToken } = response.data;

        // **Debug: Print token values**
        console.log("adminToken:", adminToken);
        console.log("doctorToken:", doctorToken);

        // ✅ Reset Redux state before setting tokens
        dispatch(addAdmin(false));
        dispatch(addDoctor(false));

        if (adminToken) {
          console.log("Admin token found, setting admin to true");
          dispatch(addAdmin(true));
        }

        if (doctorToken) {
          console.log("Doctor token found, setting doctor to true");
          dispatch(addDoctor(true));
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>; // Prevents UI flickering before authentication is checked
  }
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}>
          {aToken && <Route index element={<Dashboard />} />}
          <Route index element={<DocDashboard />} />
          <Route path="admin-dashboard" element={<Dashboard />} />
          <Route path="doctor-dashboard" element={<DocDashboard />} />
          <Route path="medicine-list" element={<MedicinesList />} />
          <Route path="orders-list" element={<AdminOrdersPage />} />
          <Route path="all-appointments" element={<AllAppointments />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="add-medicine" element={<AddMedicine />} />
          <Route path="doctor-list" element={<DoctorsList />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
