import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getHostels = async () => {
  const res = await axios.get(`${base_url}hostel/`);
  return res.data;
};
const createHostel = async (data) => {
  const res = await axios.post(`${base_url}hostel/create`, data, config());
  return res.data;
};
const updateHostel = async (hostelData) => {
  // console.log(hostelData);
  // console.log(hostelData.id);
  const res = await axios.put(
    `${base_url}hostel/${hostelData.id}`,
    {
      hostel_name: hostelData.hosteldata.hostel_name,
      hostel_type: hostelData.hosteldata.hostel_type,
      desc: hostelData.hosteldata.desc,
      capacity: hostelData.hosteldata.capacity,
      number_of_rooms: hostelData.hosteldata.number_of_rooms,
      availability: hostelData.hosteldata.availability,
      phone: hostelData.hosteldata.phone,
      images: hostelData.hosteldata.images,
    },
    config()
  );
  return res.data;
};

const getHostel = async (id) => {
  const res = await axios.get(`${base_url}hostel/${id}`, config());
  return res.data;
};

const getRoomsByHostelId = async (id) => {
  const res = await axios.get(`${base_url}hostel/room/${id}`, config());
  return res.data;
};
const getBedByHostelId = async (id) => {
  const res = await axios.get(`${base_url}hostel/bed/${id}`, config());
  return res.data;
};

const deleteHostel = async (id) => {
  const res = await axios.delete(`${base_url}hostel/${id}`, config());
  return res.data;
};

const hostelService = {
  getHostels,
  createHostel,
  getHostel,
  deleteHostel,
  getRoomsByHostelId,
  getBedByHostelId,
  updateHostel,
};

export default hostelService;
