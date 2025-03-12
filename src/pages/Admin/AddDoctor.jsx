import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    toast.info("Adding doctor...");
    try {
      if (!docImg) return toast.error("Please upload an image");

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        BACKEND_URL + "/api/admin/add-doctor",
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Doctor added successfully!");
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General Physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
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
      <h2 className="text-2xl font-semibold mb-6 text-slate-700">Add Doctor</h2>
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-800 text-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center w-full md:w-1/3">
            <label
              htmlFor="doc-img"
              className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-slate-500 bg-slate-700 text-gray-300 hover:bg-slate-600"
            >
              {docImg ? (
                <img
                  src={URL.createObjectURL(docImg)}
                  alt="Doctor"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaCloudUploadAlt size={32} />
              )}
            </label>
            <input
              type="file"
              id="doc-img"
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
            <p className="mt-2 text-sm text-gray-400">Upload Doctor Image</p>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
            >
              {[
                "General Physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatrician",
                "Neurologist",
                "Gastroenterologist",
              ].map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        <textarea
          placeholder="About Doctor"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full border border-slate-600 bg-slate-700 text-white rounded px-3 py-2 mt-4"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-slate-600 hover:bg-slate-500 text-white font-semibold px-6 py-2 rounded mt-4 w-full"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
