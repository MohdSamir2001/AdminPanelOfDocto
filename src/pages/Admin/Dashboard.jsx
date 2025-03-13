import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/constants";

const MedicinesList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllMedicines = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/all-medicines`,
        {
          withCredentials: true,
        }
      );
      setMedicines(data?.medicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMedicines();
  }, []);

  return (
    <div className="w-full px-4 md:px-10 py-6 h-[90vh] flex flex-col">
      <h1 className="text-4xl font-semibold text-center text-slate-700">
        All Medicines
      </h1>
      <p className="sm:w-1/2 text-center mx-auto text-gray-600 text-lg">
        Browse our available medicines and find what you need.
      </p>

      {/* Scrollable List */}
      <div className="w-full flex flex-col items-center gap-6 pt-5 h-[85vh] overflow-y-auto scrollbar-hide">
        {medicines.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-2xl w-full max-w-4xl flex flex-col md:flex-row items-center p-4 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
          >
            <div className="w-full md:w-1/3 flex items-center justify-center">
              <img
                className="w-[150px] h-[150px] object-cover rounded-lg"
                src={item.image}
                alt={item.name}
              />
            </div>

            <div className="w-full md:w-2/3 pl-4 text-center md:text-left">
              <p className="text-xl font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500">
                Dosage: {item.dosage} | {item.form}
              </p>
              <p className="text-sm text-gray-500">
                Manufacturer: {item.manufacturer}
              </p>
              <p className="text-lg font-semibold text-green-600 mt-2">
                Rs.{item.price} for one Strip
              </p>

              {item.prescriptionRequired && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  Prescription Required
                </p>
              )}

              {/* Stock Toggle */}
              <div className="mt-3 flex flex-col items-center md:items-start">
                <p
                  className={`text-sm font-medium ${
                    item.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <label className="flex items-center justify-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={item.stock > 0}
                    readOnly
                  />
                  <div
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all ${
                      item.stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                        item.stock > 0 ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicinesList;
