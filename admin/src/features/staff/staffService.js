import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getStaffs = async () => {
  const res = await axios.get(`${base_url}staff/`);
  return res.data;
};

const createStaff = async (data) => {
  const res = await axios.post(`${base_url}staff/create`, data, config());
  return res.data;
};

const updateStaff = async (staffData) => {
  // console.log(staffData);
  // console.log(staffData.id);
  const res = await axios.put(
    `${base_url}staff/${staffData.id}`,
    {
      name: staffData.staffdata.name,
      // hostel_type: hostelData.hosteldata.hostel_type,
      // desc: hostelData.hosteldata.desc,
      // capacity: hostelData.hosteldata.capacity,
      // number_of_rooms: hostelData.hosteldata.number_of_rooms,
      // availability: hostelData.hosteldata.availability,
      // phone: hostelData.hosteldata.phone,
      // images: hostelData.hosteldata.images,
    },
    config()
  );
  return res.data;
};

const getStaff = async (id) => {
  const res = await axios.get(`${base_url}staff/${id}`, config());
  return res.data;
};
const deleteStaff = async (id) => {
  const res = await axios.delete(`${base_url}staff/${id}`, config());
  return res.data;
};

const staffService = {
  getStaffs,
  createStaff,
  updateStaff,
  getStaff,
  deleteStaff,
};

export default staffService;
