import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const login = async (userData) => {
  const res = await axios.post(`${base_url}user/admin-login`, userData);
  console.log(res.data.token);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
  return res.data;
};

const authService = {
  login,
};

export default authService;
