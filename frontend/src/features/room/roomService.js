import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { config } from "../../utils/axiosConfig";

const getAllRooms = async () => {
  const res = await axios.get(`${base_url}room/`);
  return res.data;
};

const getSingleRoom = async (id) => {
  const res = await axios.get(`${base_url}room/${id}`, config());

  return res.data;
};

const roomService = {
  getAllRooms,
  getSingleRoom,
};

export default roomService;
