import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getBlogsCat = async () => {
  const res = await axios.get(`${base_url}blogcategory/`);
  return res.data;
};

const blogCatService = {
  getBlogsCat,
};

export default blogCatService;
