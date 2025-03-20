import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaCalendarCheck,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const aToken = true;
  const dToken = false;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-white p-3 fixed top-4 left-4 bg-slate-800 rounded-lg z-50"
        onClick={() => setIsMobileOpen(true)}
      >
        <FaBars size={15} />
      </button>

      {/* Sidebar (Desktop & Mobile) */}
      <div
        className={`h-screen bg-slate-800 text-white p-4 transition-all duration-300 shadow-xl 
          ${isCollapsed ? "w-20" : "w-64"} 
          ${isMobileOpen ? "fixed top-0 left-0 w-64 z-50" : "hidden md:block"}
        `}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-slate-700 mb-4 flex items-center justify-center w-full"
          onClick={() => setIsMobileOpen(false)}
        >
          <FaTimes size={22} />
        </button>

        {/* Toggle Button (Only for Desktop) */}
        <button
          className="hidden md:flex text-white p-2 rounded-lg hover:bg-slate-700 mb-4"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaBars size={22} />
        </button>

        {aToken && (
          <ul className="space-y-2">
            <NavItem
              to="/"
              icon={<FaHome />}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />

            <NavItem
              to="/all-appointments"
              icon={<FaCalendarCheck />}
              label="Appointments"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/add-doctor"
              icon={<FaUserPlus />}
              label="Add Doctor"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/doctor-list"
              icon={<FaUserMd />}
              label="Doctors List"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/add-medicine"
              icon={<AiOutlineMedicineBox />}
              label="Add Medicine"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/medicine-list"
              icon={<GiMedicines />}
              label="Medicines List"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/orders-list"
              icon={<GiMedicines />}
              label="Orders List"
              isCollapsed={isCollapsed}
            />
          </ul>
        )}

        {dToken && (
          <ul className="space-y-2 mt-4">
            <NavItem
              to="/doctor-dashboard"
              icon={<FaHome />}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/doctor-appointments"
              icon={<FaCalendarCheck />}
              label="Appointments"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/doctor-profile"
              icon={<FaUserMd />}
              label="Profile"
              isCollapsed={isCollapsed}
            />
          </ul>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

const NavItem = ({ to, icon, label, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-slate-700 hover:shadow-md ${
          isActive ? "bg-slate-600 shadow-lg" : ""
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && <span className="font-semibold">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
