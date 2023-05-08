import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const uploadImgs = async (data) => {
  // console.log(req.files);
  // console.log(data);
  const res = await axios.post(`${base_url}upload/`, data, config());
  return res.data;
};

const deleteImgs = async (id) => {
  // console.log(config);
  // console.log(id);

  const res = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    config()
  );
  return res.data;
};

const uploadService = {
  uploadImgs,
  deleteImgs,
};

export default uploadService;
