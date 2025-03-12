import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addDoctors } from "../../utils/allDoctorsSlice";

const DoctorsList = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((store) => store.doctors);
  const [loading, setLoading] = useState(false);

  // Fetch all doctors from the backend
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/admin/all-doctors`, {
        withCredentials: true,
      });
      dispatch(addDoctors(data?.doctors));
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Toggle doctor's availability
  const changeAvailability = async (doctorId) => {
    try {
      setLoading(true);
      dispatch(
        addDoctors(
          doctors.map((doc) =>
            doc._id === doctorId ? { ...doc, avaliable: !doc.avaliable } : doc
          )
        )
      );
      const { data } = await axios.post(
        `${BACKEND_URL}/api/doctor/change-availablity`,
        { doctorId },
        { withCredentials: true }
      );
      if (!data.success) {
        throw new Error("Failed to update availability");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      getAllDoctors();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 my-4 text-[#262626] px-4 md:px-10 h-[90vh] overflow-y-auto scrollbar-hide">
      <h1 className="text-4xl font-semibold text-center text-slate-700">
        All Doctors
      </h1>
      <p className="sm:w-1/2 text-center text-gray-600 text-lg">
        Browse our list of top doctors available for consultation.
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white max-w-[250px] min-h-[420px]"
          >
            {/* Doctor Image */}
            <div className="w-full h-[260px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Details */}
            <div className="p-4 text-center">
              <p className="text-xl font-semibold text-gray-800 mt-2">
                {item.name}
              </p>
              <p className="text-gray-500 text-sm">{item.speciality}</p>

              {/* Availability Status */}
              <p
                className={`text-sm font-medium mt-2 ${
                  item.avaliable ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.avaliable ? "Available" : "Not Available"}
              </p>

              {/* Change Availability Toggle */}
              <label className="mt-3 flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={item.avaliable}
                  onChange={() => changeAvailability(item._id)}
                  disabled={loading}
                />
                <div
                  className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all ${
                    item.avaliable ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                      item.avaliable ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
