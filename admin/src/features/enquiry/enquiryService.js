import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getEnquiry = async () => {
  const res = await axios.get(`${base_url}enquiry/`);
  return res.data;
};

const enquiryService = {
  getEnquiry,
};

export default enquiryService;
