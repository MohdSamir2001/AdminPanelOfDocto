import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../../utils/constants";

const DoctorsList = () => {
  const getAllDoctors = async () => {
    const data = await axios.get(BACKEND_URL + "/api/admin/all-doctors", {
      withCredentials: true,
    });
    const doctors = data?.data?.doctors;
    console.log(doctors);
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  return <div>DoctorList</div>;
};
export default DoctorsList;
