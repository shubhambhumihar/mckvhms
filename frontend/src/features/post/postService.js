import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// const createAPost = async (postData) => {
//   const res = await axios.post(`${base_url}post/`, postData, config);

//   // if (res.data) {
//   return "hi";
//   // }
// };

const createNewPost = async (postData) => {
  console.log(postData);
  const res = await axios.post(`${base_url}post/`, postData, config());

  if (res.data) {
    return res.data;
  }
};
const getAllPost = async () => {
  const res = await axios.get(`${base_url}post/`);

  if (res.data) {
    return res.data;
  }
};
const deletePost = async (id) => {
  const res = await axios.delete(`${base_url}post/${id}`, config());

  if (res.data) {
    return res.data;
  }
};

const likeDislikeAPost = async (postId) => {
  const res = await axios.put(`${base_url}post/${postId}/like`, null, config());

  if (res.data) {
    return res.data;
  }
};

const postService = {
  createNewPost,
  getAllPost,
  deletePost,
  likeDislikeAPost,
};

export default postService;
