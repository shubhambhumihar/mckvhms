import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const createComplain = async (data) => {
  const res = await axios.post(`${base_url}enquiry/`, data, config());
  return res.data;
};

const complainService = {
  createComplain,
};

export default complainService;
