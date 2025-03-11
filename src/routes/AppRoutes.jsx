import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
