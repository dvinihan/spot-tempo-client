import axios from "axios";
import { serverUrl } from "../constants/constants";

export const getAccessToken = async () => {
  const { data } = await axios.get(`${serverUrl}/getAccessToken`);
  return data;
};

export const login = async ({ code, redirectUri }) => {
  const { data } = await axios.post(`${serverUrl}/login`, {
    code,
    redirect_uri: redirectUri,
  });
  return data;
};
