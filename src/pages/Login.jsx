import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const url =
      activeTab === "Admin" ? "/api/admin/login" : "/api/doctor/login";
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}${url}`,
        { email, password },
        { withCredentials: true }
      );
      toast.success(`${activeTab} logged in successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      setTimeout(() => navigate("/"), 1000); // Delay to allow toast to show
    } catch (error) {
      console.error("Login Failed:", error); // Debugging

      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
      {/* Toast Container placed at the top level */}
      <ToastContainer />

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        {/* Tabs */}
        <div className="flex justify-between border-b border-gray-500/50 pb-2">
          {["Admin", "Doctor"].map((role) => (
            <button
              key={role}
              className={`w-1/2 text-center py-2 font-semibold transition-all duration-300 ${
                activeTab === role
                  ? "bg-gray-700 text-white rounded-md shadow-md scale-105"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(role)}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler} className="mt-6">
          <div className="text-3xl flex justify-center gap-2 font-bold text-white mb-5">
            <h1>{activeTab}</h1>
            <h1 className="text-gray-400">Login</h1>
          </div>

          <div>
            <label className="block text-gray-400 font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="w-full font-light p-3 mt-1 border border-gray-500 bg-transparent rounded-md focus:ring-2 focus:ring-gray-600 outline-none text-white placeholder-gray-500 transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-400 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="w-full font-light p-3 mt-1 border border-gray-500 bg-transparent rounded-md focus:ring-2 focus:ring-gray-600 outline-none text-white placeholder-gray-500 transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md mt-6 hover:bg-gray-600 transition-all shadow-md hover:shadow-gray-500/50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
