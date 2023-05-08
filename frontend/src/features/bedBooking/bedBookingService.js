import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const createBedBooking = async (data) => {
  const res = await axios.post(`${base_url}bed-request/`, data, config());
  return res.data;
};
const getAllBedBookings = async () => {
  const res = await axios.get(`${base_url}bed-request/`, config());
  return res.data;
};
const getStudentBedBooking = async () => {
  const res = await axios.get(
    `${base_url}bed-request/student-bed-request`,
    config()
  );
  return res.data;
};

const bedBookingService = {
  createBedBooking,
  getAllBedBookings,
  getStudentBedBooking,
};

export default bedBookingService;
