import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      BACKEND_URL + "/api/admin/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Left Section - Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </button>

      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer tracking-wide"
        >
          DOCTO
        </div>
        <span className="text-sm md:text-base font-light bg-slate-600 px-4 py-1 rounded-md border border-slate-500">
          Admin Panel
        </span>
      </div>

      {/* Logout Button (Visible on Desktop) */}
      <button
        onClick={handleLogout}
        className="hidden md:flex items-center gap-2 font-semibold bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <FaSignOutAlt /> Logout
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900 text-white shadow-md flex flex-col items-center py-5 z-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-lg font-semibold bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
