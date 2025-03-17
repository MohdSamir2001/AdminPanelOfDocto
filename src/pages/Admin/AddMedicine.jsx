import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddMedicine = () => {
  const [medicineImg, setMedicineImg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // ✅ Added Description Field
  const [includeSalts, setIncludeSalts] = useState("");
  const [noOfTablets, setNoOfTablets] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Pain Relief");
  const [stock, setStock] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);
  const [dosage, setDosage] = useState("");
  const [form, setForm] = useState("Tablet");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    toast.info("Adding medicine...");

    try {
      if (!medicineImg) return toast.error("Please upload an image");

      const formData = new FormData();
      formData.append("image", medicineImg);
      formData.append("name", name);
      formData.append("description", description); // ✅ Included in FormData
      formData.append("includeSalts", includeSalts);
      formData.append("noOfTablets", Number(noOfTablets));
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("manufacturer", manufacturer);
      formData.append("expiryDate", expiryDate);
      formData.append("prescriptionRequired", prescriptionRequired);
      formData.append("dosage", dosage);
      formData.append("form", form);

      const { data } = await axios.post(
        BACKEND_URL + "/api/admin/add-medicine",
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Medicine added successfully!");
        setMedicineImg(null);
        setName("");
        setDescription(""); // ✅ Reset Description
        setIncludeSalts("");
        setNoOfTablets("");
        setPrice("");
        setCategory("Pain Relief");
        setStock(false);
        setManufacturer("");
        setExpiryDate("");
        setPrescriptionRequired(false);
        setDosage("");
        setForm("Tablet");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="p-6 w-full">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6 text-slate-700">
        Add Medicine
      </h2>
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-800 text-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center w-full md:w-1/3">
            <label
              htmlFor="medicine-img"
              className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-slate-500 bg-slate-700 text-gray-300 hover:bg-slate-600"
            >
              {medicineImg ? (
                <img
                  src={URL.createObjectURL(medicineImg)}
                  alt="Medicine"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaCloudUploadAlt size={32} />
              )}
            </label>
            <input
              type="file"
              id="medicine-img"
              hidden
              onChange={(e) => setMedicineImg(e.target.files[0])}
            />
            <p className="mt-2 text-sm text-gray-400">Upload Medicine Image</p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Medicine Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 500mg)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Include Salts"
              value={includeSalts}
              onChange={(e) => setIncludeSalts(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              placeholder="No of Tablets"
              value={noOfTablets}
              onChange={(e) => setNoOfTablets(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
            />
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <select
              value={form}
              onChange={(e) => setForm(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
            >
              {["Tablet", "Syrup", "Capsule", "Injection"].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* Stock Checkbox */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={stock}
                onChange={() => setStock(!stock)}
                className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <label className="text-white text-sm">In Stock</label>
            </div>

            {/* Prescription Required Checkbox */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={prescriptionRequired}
                onChange={() => setPrescriptionRequired(!prescriptionRequired)}
                className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <label className="text-white text-sm">
                Prescription Required
              </label>
            </div>
          </div>
        </div>

        {/* Description Field */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 mt-4"
          rows={4}
          required
        />

        <button
          type="submit"
          className="bg-slate-600 hover:bg-slate-500 text-white font-semibold px-6 py-2 rounded mt-4 w-full"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
