import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getColors = async () => {
  const res = await axios.get(`${base_url}color/`);
  return res.data;
};

const colorService = {
  getColors,
};

export default colorService;
