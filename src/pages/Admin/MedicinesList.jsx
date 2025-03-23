import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../utils/constants";

const MedicinesList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editStock, setEditStock] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

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
      toast.error("Failed to load medicines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMedicines();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Medicine ID is missing.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this medicine?"))
      return;
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/delete-medicine/${id}`, {
        withCredentials: true,
      });
      setMedicines(medicines.filter((item) => item._id !== id));
      toast.success("Medicine deleted successfully!");
    } catch (error) {
      console.error("Error deleting medicine:", error);
      toast.error("Failed to delete medicine.");
    }
  };

  const handleStockUpdate = async (id) => {
    try {
      const updatedQuantity = parseInt(newQuantity, 10);
      if (isNaN(updatedQuantity) || updatedQuantity < 0) {
        toast.error("Please enter a valid quantity.");
        return;
      }
      await axios.put(
        `${BACKEND_URL}/api/admin/update-medicine-stock/${id}`,
        { quantityInStore: updatedQuantity },
        { withCredentials: true }
      );
      setMedicines(
        medicines.map((item) =>
          item._id === id ? { ...item, quantityInStore: updatedQuantity } : item
        )
      );
      toast.success("Stock quantity updated successfully!");
      setEditStock(null);
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Failed to update stock quantity.");
    }
  };

  return (
    <div className="w-full px-4 md:px-10 py-6 h-[90vh] flex flex-col">
      <h1 className="text-4xl font-semibold text-center text-slate-700">
        All Medicines
      </h1>
      <p className="sm:w-1/2 text-center mx-auto text-gray-600 text-lg">
        Browse our available medicines and manage stock levels.
      </p>
      <div className="w-full max-w-4xl mx-auto mt-4">
        <input
          type="text"
          placeholder="Search by name, salt, or category..."
          className="w-full font-light p-3 border border-gray-300 rounded-lg shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col items-center gap-6 pt-5 h-[85vh] overflow-y-auto scrollbar-hide">
        {medicines
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 rounded-2xl w-full max-w-4xl flex flex-col md:flex-row items-center p-4 shadow-lg bg-white relative"
            >
              <div className="w-full md:w-1/3 flex items-center justify-center">
                <img
                  className="w-[150px] h-[150px] object-cover rounded-lg"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="w-full md:w-2/3 pl-4 text-center md:text-left">
                <p className="text-xl font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-sm text-gray-500">
                  <strong>Dosage:</strong> {item.dosage} | {item.form}
                </p>
                <p className="text-lg font-semibold text-green-600 mt-1">
                  Rs.{item.price} per Strip
                </p>
                <div className="mt-3 flex flex-col items-center md:items-start">
                  {editStock === item._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="border p-2 rounded-md w-20"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                      />
                      <button
                        onClick={() => handleStockUpdate(item._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-gray-500">
                      <strong>Stock:</strong> {item.quantityInStore}
                      <button
                        onClick={() => {
                          setEditStock(item._id);
                          setNewQuantity(item.quantityInStore);
                        }}
                        className="ml-2 text-blue-500 underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MedicinesList;
