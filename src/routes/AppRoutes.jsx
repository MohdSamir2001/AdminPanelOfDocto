import React from "react";
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

const AppRoutes = () => {
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
