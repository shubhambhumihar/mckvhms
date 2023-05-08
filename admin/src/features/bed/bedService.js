import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBeds = async () => {
  const res = await axios.get(`${base_url}bed/`);
  return res.data;
};

const createBed = async (data) => {
  const res = await axios.post(`${base_url}bed/create`, data, config());
  return res.data;
};

const getSingleBed = async (id) => {
  const res = await axios.get(`${base_url}bed/${id}`, config());
  return res.data;
};
const getStudentOfSingleBed = async (id) => {
  const res = await axios.get(`${base_url}bed/${id}/student`, config());
  return res.data;
};
const deleteBed = async (id) => {
  const res = await axios.delete(`${base_url}bed/${id}`, config());
  return res.data;
};

const bedService = {
  getBeds,
  createBed,
  getSingleBed,
  getStudentOfSingleBed,
  deleteBed,
};

export default bedService;
