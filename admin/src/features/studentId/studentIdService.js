import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const createStudentId = async (data) => {
  const res = await axios.post(`${base_url}studentId/`, data, config());
  return res.data;
};

const getStudentIds = async () => {
  const res = await axios.get(`${base_url}studentId/`, config());
  return res.data;
};

const studentIdService = {
  createStudentId,
  getStudentIds,
};

export default studentIdService;
