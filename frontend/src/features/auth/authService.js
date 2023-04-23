import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const res = await axios.post(`${base_url}user/register`, userData);

  if (res.data) {
    localStorage.setItem("user-frontend", JSON.stringify(res.data));
    // console.log(res.data.user);
    // localStorage.setItem("ton", JSON.stringify(res.data.token));
    return res.data;
  }
};

const login = async (userData) => {
  const res = await axios.post(`${base_url}user/login`, userData);

  if (res.data) {
    localStorage.setItem("user-frontend", JSON.stringify(res.data));
    // console.log(res.data.user);
    //   localStorage.setItem("token", JSON.stringify(res.data.token));
    return res.data;
  }
};
const updateProfile = async (userData) => {
  // console.log(userData);
  const res = await axios.put(
    `${base_url}user/update-user`,
    {
      name: userData.name,
      mobile: userData.mobile,

      email: userData.email,
    },
    config
  );

  return res.data;
};
const logout = async () => {
  // console.log(userData);
  const res = await axios.get(
    `${base_url}user/logout`,

    config
  );

  return res.data;
};

const authService = {
  register,
  login,
  updateProfile,
  logout,
};

export default authService;
