import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const uploadImg = async (data) => {
  console.log(data);
  const res = await axios.post(`${base_url}uploadImg/`, data, config);
  if (res.data) {
    return res.data;
  }
};

// for profile
// const uploadImage = async (data) => {
//   console.log(data);
//   const res = await axios.post(`${base_url}upload/`, data, config);

//   return res.data;
// };

const uploadImgs = async (data) => {
  // console.log(req.files);
  // console.log(data);
  const res = await axios.post(`${base_url}upload/`, data, config);
  return res.data;
};

const deleteImg = async (id) => {
  console.log(config);
  console.log(id);

  const res = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
  return res.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
  uploadImgs,
};

export default uploadService;
