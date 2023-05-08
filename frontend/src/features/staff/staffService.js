import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getStaffs = async () => {
  const res = await axios.get(
    `${base_url}staff/`,

    config()
  );

  return res.data;
};

const staffService = {
  getStaffs,
};

export default staffService;
