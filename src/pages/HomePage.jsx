import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "./Login";
import { useSelector } from "react-redux";

const HomePage = () => {
  const atoken = useSelector((store) => store.admin);
  const dtoken = useSelector((store) => store.doctor);
  return (
    <div className="flex gap-2">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default HomePage;
