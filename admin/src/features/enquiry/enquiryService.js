import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getEnquiry = async () => {
  const res = await axios.get(`${base_url}enquiry/`, config);
  return res.data;
};
const updateEnquiry = async (data) => {
  const res = await axios.put(
    `${base_url}enquiry/${data.id}`,
    { status: data.value },
    config
  );
  return res.data;
};

const enquiryService = {
  getEnquiry,
  updateEnquiry,
};

export default enquiryService;
