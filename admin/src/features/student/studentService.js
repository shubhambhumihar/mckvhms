import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const createStudent = async (data) => {
  const res = await axios.post(`${base_url}student/`, data, config);
  return res.data;
};

const getAllStudents = async () => {
  const res = await axios.get(`${base_url}student/`, config);
  return res.data;
};

const studentService = {
  createStudent,
  getAllStudents,
};

export default studentService;
