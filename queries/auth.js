import axios from "axios";
import { useQuery } from "react-query";
import { serverUrl } from "../constants/constants";

export const useAccessToken = () =>
  useQuery("getAccessToken", async () => {
    const { data } = await axios.get(`${serverUrl}/getAccessToken`);
    return data;
  });
