import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
  const res = await axios.post(`${base_url}user/admin-login`, userData);
  // console.log(res.data.token);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
  return res.data;
};
const logout = async () => {
  const res = await axios.get(`${base_url}user/logout-admin`, config());

  if (res.data) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return res.data;
  }
};
const getMyProfile = async () => {
  const res = await axios.get(`${base_url}user/profile`, config());

  if (res.data) {
    return res.data;
  }
};

const authService = {
  login,
  logout,
  getMyProfile,
};

export default authService;
