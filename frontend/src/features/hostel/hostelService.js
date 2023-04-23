import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getHostels = async () => {
  const res = await axios.get(
    `${base_url}hostel/`,

    config
  );

  return res.data;
};

const getSingleHostel = async (id) => {
  const res = await axios.get(
    `${base_url}hostel/${id}`,
    config
  );

  return res.data;
};

const hostelService = {
  getHostels,
  getSingleHostel,
};

export default hostelService;
