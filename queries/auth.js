import axios from "axios";
import { serverUrl } from "../constants/constants";

export const login = async ({ code, redirectUri } = {}) => {
  const { data } = await axios.post(`${serverUrl}/login`, {
    code,
    redirectUri,
  });
  return data;
};
