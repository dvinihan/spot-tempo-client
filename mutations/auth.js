import axios from "axios";
import { useMutation } from "react-query";
import { serverUrl } from "../constants/constants";

export const useLogin = () =>
  useMutation("login", async ({ code, redirectUri }) => {
    const { data } = await axios.post(`${serverUrl}/login`, {
      code,
      redirect_uri: redirectUri,
    });
    return data;
  });
