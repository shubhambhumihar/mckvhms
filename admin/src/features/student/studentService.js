import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getAllStudents = async () => {
  const res = await axios.get(`${base_url}student/`);
  return res.data;
};

const studentService = {
  getAllStudents,
};

export default studentService;
