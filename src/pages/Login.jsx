import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../utils/constants";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Admin"); // State to manage active tab
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const url =
      activeTab === "Admin" ? "/api/admin/login" : "/api/doctor/login";

    await axios.post(BACKEND_URL + url, { email, password });
  };

  return (
    <div className="min-h-screen font-semibold flex items-center justify-center bg-slate-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        {/* Tabs */}
        <div className="flex justify-between border-b pb-2">
          <button
            className={`w-1/2 cursor-pointer text-center py-2 font-semibold ${
              activeTab === "Admin"
                ? "border-2 bg-black border-slate-500 text-white rounded-md"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Admin")}
          >
            Admin
          </button>
          <button
            className={`w-1/2 cursor-pointer text-center py-2 font-semibold ${
              activeTab === "Doctor"
                ? "border-2 bg-black border-slate-500 text-white rounded-md"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Doctor")}
          >
            Doctor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler} className="mt-5">
          <div className="text-3xl justify-center gap-2 flex font-bold text-gray-700 text-center mb-5">
            <h1 className="text-black">{activeTab} </h1>
            <h1>Login</h1>
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-slate-700 outline-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-slate-700 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-slate-700 text-white py-2 rounded-md mt-5 hover:bg-black transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
