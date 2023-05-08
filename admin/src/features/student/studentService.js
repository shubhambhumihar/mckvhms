import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const createStudent = async (data) => {
  const res = await axios.post(`${base_url}student/`, data, config());
  return res.data;
};

const getAllStudents = async () => {
  const res = await axios.get(`${base_url}student/`, config());
  return res.data;
};
const getAStudent = async (id) => {
  const res = await axios.get(`${base_url}student/${id}`, config());
  return res.data;
};
const updateStudent = async (studentData) => {
  // console.log(studentData);
  const res = await axios.put(
    `${base_url}student/${studentData.id}`,
    {
      name: studentData.studentdata?.name,
      email: studentData.studentdata?.email,
      gender: studentData.studentdata?.gender,
      course: studentData.studentdata?.course,
      batch: studentData.studentdata?.batch,
      department: studentData.studentdata?.department,
      semester: studentData.studentdata?.semester,
      mobile: studentData.studentdata?.mobile,
      parentContactNumber: studentData.studentdata?.parentContactNumber,
      address: studentData.studentdata?.address,
      student_id: studentData.studentdata?.student_id,
      room_id: studentData.studentdata?.room_id,
      bed_id: studentData.studentdata?.bed_id,
      hostel_id: studentData.studentdata?.hostel_id,
    },
    config()
  );
  return res.data;
};
const deleteAStudent = async (id) => {
  const res = await axios.delete(`${base_url}student/${id}`, config());
  return res.data;
};

const studentService = {
  createStudent,
  getAllStudents,
  getAStudent,
  updateStudent,
  deleteAStudent,
};

export default studentService;
