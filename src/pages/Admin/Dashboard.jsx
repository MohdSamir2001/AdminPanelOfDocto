import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format Date Helper
  const formatSlotDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    const [day, month, year] = dateString.split("_");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log("Fetching dashboard data...");
        const response = await axios.get(`${BACKEND_URL}/api/admin/dashboard`, {
          withCredentials: true,
        });

        console.log("API Response:", response.data.dashData);
        if (response.data.success) {
          setDashData(response.data.dashData);
        } else {
          setError("Failed to fetch dashboard data.");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Error fetching dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Cancel Appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/admin/cancel-appointment`,
        {
          appointmentId,
        },
        { withCredentials: true }
      );

      setDashData((prev) => ({
        ...prev,
        latestAppointments: prev?.latestAppointments?.map((item) =>
          item._id === appointmentId ? { ...item, cancelled: true } : item
        ),
      }));
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  // Loading & Error Handling
  if (loading)
    return <p className="text-center text-gray-700 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="m-5">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            icon: assets.doctor_icon,
            label: "Doctors",
            value: dashData?.doctors ?? 0,
          },
          {
            icon: assets.appointments_icon,
            label: "Appointments",
            value: dashData?.appointments ?? 0,
          },
          {
            icon: assets.patients_icon,
            label: "Patients",
            value: dashData?.patients ?? 0,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 rounded-lg shadow-lg transform transition-all hover:scale-105"
          >
            <img className="w-14" src={item.icon} alt={item.label} />
            <div>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-10 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 px-5 py-4 border-b bg-gradient-to-r from-gray-100 to-gray-200">
          <img src={assets.list_icon} alt="Bookings" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData?.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                className="flex items-center px-6 py-4 gap-5 hover:bg-gray-50 transition-all"
                key={index}
              >
                <img
                  className="rounded-full w-12 h-12 border-2 border-gray-300"
                  src={item.doctorData?.image}
                  alt="Doctor"
                />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-lg">
                    {item.doctorData?.name ?? "Unknown"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Booking on {formatSlotDate(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-semibold">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-semibold">
                    Completed
                  </p>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-gray-500">
              No Appointments Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
