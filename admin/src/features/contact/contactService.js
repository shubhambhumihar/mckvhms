import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getContacts = async () => {
  const res = await axios.get(`${base_url}contact/`, config());
  return res.data;
};
const deleteContact = async (id) => {
  const res = await axios.delete(`${base_url}contact/${id}`, config());
  return res.data;
};
// const updateEnquiry = async (data) => {
//   const res = await axios.put(
//     `${base_url}enquiry/${data.id}`,
//     { status: data.value },
//     config
//   );
//   return res.data;
// };

const contactService = {
  getContacts,
  deleteContact,
  //   updateEnquiry,
};

export default contactService;
