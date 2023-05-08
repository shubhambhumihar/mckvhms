import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const res = await axios.post(`${base_url}user/register`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    // console.log(res.data.user);
    // localStorage.setItem("ton", JSON.stringify(res.data.token));
    return res.data;
  }
};

const login = async (userData) => {
  const res = await axios.post(`${base_url}user/login`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    // console.log(res.data.user);
    //   localStorage.setItem("token", JSON.stringify(res.data.token));
    return res.data;
  }
};
const getMyProfile = async () => {
  const res = await axios.get(`${base_url}user/profile`, config());

  if (res.data) {
    return res.data;
  }
};
const loginasStudent = async (userData) => {
  const res = await axios.post(
    `${base_url}student/loginAsStudent`,
    userData,
    config()
  );

  if (res.data) {
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
      // userData,
    },
    config()
  );

  if (res.data) {
    // localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};
const logout = async () => {
  // console.log(userData);
  const res = await axios.get(
    `${base_url}user/logout`,

    config()
  );
  if (res.data) {
    // Remove the user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("tkn");

    return res.data;
  }
};

const authService = {
  register,
  login,
  loginasStudent,
  updateProfile,
  logout,
  getMyProfile,
};

export default authService;
