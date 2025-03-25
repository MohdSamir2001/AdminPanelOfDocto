import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { BACKEND_URL } from "../../utils/constants";

const DocDashboard = () => {
  const [dashData, setDashData] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Doctor ID from backend
  useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/doctor/profile`, {
          withCredentials: true,
        });

        console.log("Doctor API Response:", response.data);

        if (response.data?.profileData?._id) {
          setDoctorId(response.data.profileData._id);
          console.log("Doctor ID:", response.data.profileData._id);
        } else {
          console.error("Doctor ID not found in response!");
        }
      } catch (error) {
        console.error("Error fetching doctor ID:", error);
      }
    };

    fetchDoctorId();
  }, []);

  // Fetch Dashboard Data when doctorId is available
  useEffect(() => {
    if (doctorId) {
      fetchDashboardData();
    }
  }, [doctorId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/doctor/dashboard`, {
        params: { docId: doctorId },
        withCredentials: true,
      });

      console.log("Dashboard Data:", response.data);
      setDashData(response.data.dashData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    setLoading(false);
  };

  // Update Appointment Status (Cancel or Complete)
  const updateAppointment = async (appointmentId, action) => {
    const endpoint =
      action === "cancel" ? "/cancel-appointment" : "/complete-appointment";

    try {
      await axios.post(
        `${BACKEND_URL}/api/doctor${endpoint}`,
        {
          docId: doctorId,
          appointmentId,
          acceptAppointment: action === "complete" ? true : false, // ✅ Ensure DB update
        },
        { withCredentials: true }
      );

      console.log(`Appointment ${action}d successfully!`);

      // 🚀 Refresh the dashboard immediately after update
      fetchDashboardData();
    } catch (error) {
      console.error(`Error updating appointment: ${error}`);
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    const [day, month, year] = dateString.split("_");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };

  return (
    <div className="m-5 space-y-6">
      {loading ? (
        <p className="text-center text-gray-600 font-medium">Loading...</p>
      ) : (
        dashData && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard
                icon={assets.earning_icon}
                value={`$${dashData.earnings}`}
                label="Earnings"
              />
              <InfoCard
                icon={assets.appointments_icon}
                value={dashData.appointments}
                label="Appointments"
              />
              <InfoCard
                icon={assets.patients_icon}
                value={dashData.patients}
                label="Patients"
              />
            </div>

            {/* Latest Bookings */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <img src={assets.list_icon} alt="List" className="w-5 h-5" />
                <p className="font-semibold text-lg">Latest Bookings</p>
              </div>

              {dashData.latestAppointments.length === 0 ? (
                <p className="text-gray-500 text-center">No recent bookings.</p>
              ) : (
                <div className="space-y-4">
                  {dashData.latestAppointments
                    .slice(0, 5)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            className="rounded-full w-10 h-10"
                            src={item.userData.image}
                            alt="Patient"
                          />
                          <div className="text-sm">
                            <p className="text-gray-800 font-medium">
                              {item.userData.name}
                            </p>
                            <p className="text-gray-600">
                              Booking on {formatDate(item.slotDate)}
                            </p>
                          </div>
                        </div>

                        {/* Status Handling: Completed, Cancelled, or Action Buttons */}
                        {item.cancelled ? (
                          <span className="text-red-500 text-sm font-medium">
                            Cancelled
                          </span>
                        ) : item.acceptAppointment ? ( // ✅ Check if appointment is accepted
                          <span className="text-green-500 text-sm font-medium">
                            Completed
                          </span>
                        ) : (
                          <div className="flex space-x-3">
                            <img
                              onClick={() =>
                                updateAppointment(item._id, "cancel")
                              }
                              className="w-8 h-8 cursor-pointer hover:opacity-80"
                              src={assets.cancel_icon}
                              alt="Cancel"
                            />
                            <img
                              onClick={() =>
                                updateAppointment(item._id, "complete")
                              }
                              className="w-8 h-8 cursor-pointer hover:opacity-80"
                              src={assets.tick_icon}
                              alt="Complete"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

// Reusable InfoCard Component
const InfoCard = ({ icon, value, label }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <img className="w-14" src={icon} alt={label} />
      <div className="ml-4">
        <p className="text-xl font-semibold text-gray-600">{value}</p>
        <p className="text-gray-400">{label}</p>
      </div>
    </div>
  );
};

export default DocDashboard;
