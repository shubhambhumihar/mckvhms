import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getAllBedBookings = async () => {
  const res = await axios.get(`${base_url}bed-request/`, config());
  return res.data;
};
const updateBedBooking = async (data) => {
  const res = await axios.put(
    `${base_url}bed-request/${data.id}/update-status`,
    { status: data.value },
    config()
  );
  return res.data;
};
const deleteBedBooking = async (id) => {
  const res = await axios.delete(
    `${base_url}bed-request/${id}`,

    config()
  );
  return res.data;
};

const bedBookingRequestService = {
  getAllBedBookings,
  updateBedBooking,
  deleteBedBooking,
};

export default bedBookingRequestService;
