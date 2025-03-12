import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const navigate = useNavigate();
  const getDoctors = async () => {
    try {
      const data = await axios.get(BACKEND_URL + "/api/admin/all-doctors", {
        withCredentials: true,
      });
      !data?.data?.success && navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <div className="flex gap-2">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default HomePage;
