import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Login from "./Login";
import { useSelector } from "react-redux";

const HomePage = () => {
  const atoken = useSelector((store) => store.admin);
  const dtoken = useSelector((store) => store.doctor);

  return atoken || dtoken ? (
    <div className="flex gap-2">
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Login />
  );
};

export default HomePage;
