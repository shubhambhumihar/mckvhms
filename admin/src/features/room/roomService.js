import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getAllRooms = async () => {
  const res = await axios.get(`${base_url}room/`);
  return res.data;
};

const createRoom = async (data) => {
  const res = await axios.post(`${base_url}room/create`, data, config());
  return res.data;
};

const updateRoom = async (roomData) => {
  // console.log(roomData);
  // console.log(hostelData.id);
  const res = await axios.put(
    `${base_url}room/${roomData.id}`,
    {
      title: roomData.roomdata.title,
      roomNumber: roomData.roomdata.roomNumber,
      numberOfBeds: roomData.roomdata.numberOfBeds,
      description: roomData.roomdata.description,
      price: roomData.roomdata.price,
      capacity: roomData.roomdata.capacity,
      hostel_id: roomData.roomdata.hostel_id,
    },
    config()
  );
  return res.data;
};

const getRoom = async (id) => {
  const res = await axios.get(`${base_url}room/${id}`, config());
  return res.data;
};
const getBedOfRoom = async (id) => {
  const res = await axios.get(`${base_url}room/bed/${id}`, config());
  return res.data;
};
const deleteRoom = async (id) => {
  const res = await axios.delete(`${base_url}room/${id}`, config());
  return res.data;
};

const roomService = {
  getAllRooms,
  createRoom,
  getBedOfRoom,
  // updateHostel,
  updateRoom,
  getRoom,
  deleteRoom,
};

export default roomService;
