import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Function to format date from "DD_MM_YYYY" to a valid format
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Handle missing date
    const [day, month, year] = dateString.split("_"); // Split "28_3_2025" into [28, 3, 2025]
    return new Date(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    ).toLocaleDateString();
  };

  // Function to calculate age, default to 21 if dob is missing/invalid
  const calculateAge = (dob) => {
    if (!dob) return 21; // Default age
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return 21; // If invalid date, return default
    return new Date().getFullYear() - birthDate.getFullYear();
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          BACKEND_URL + "/api/admin/appointments",
          { withCredentials: true }
        );
        console.log(response);
        if (response.data.success) {
          setAppointments(response.data.appointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.post(BACKEND_URL + "/api/admin/cancel-appointment", {
        appointmentId,
      });
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === appointmentId ? { ...item, cancelled: true } : item
        )
      );
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium text-white">All Appointments</p>
      <div className="bg-gray-800 border border-gray-700 rounded text-sm max-h-[80vh] overflow-y-scroll text-white">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-300 py-3 px-6 border-b border-gray-700 hover:bg-gray-700"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  className="w-8 h-8 rounded-full"
                  alt="Patient"
                />
                <p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {item.slotDate
                  ? `${formatDate(item.slotDate)}, ${item.slotTime}`
                  : "Invalid Date"}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={item.doctorData.image}
                  className="w-8 h-8 rounded-full bg-gray-200"
                  alt="Doctor"
                />
                <p>{item.doctorData.name}</p>
              </div>
              <p>${item.amount}</p>

              {/* Conditional Rendering for Action Column */}
              {item.acceptAppointment ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer hover:opacity-80"
                  src={assets.cancel_icon}
                  alt="Cancel Appointment"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-6">
            No Appointments Found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
