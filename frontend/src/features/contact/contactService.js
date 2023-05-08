import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const createContact = async (contactData) => {
  console.log(contactData);
  const res = await axios.post(`${base_url}contact/`, contactData, config());
  return res.data;
};

const contactService = {
  createContact,
};

export default contactService;
