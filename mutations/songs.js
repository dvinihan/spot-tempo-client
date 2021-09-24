import axios from "axios";
import { useMutation } from "react-query";
import { serverUrl } from "../constants/constants";

export const useReloadSavedSongs = () =>
  useMutation("reloadSavedSongs", async () => {
    const { data } = await axios.post(`${serverUrl}/reload`);
    return data;
  });
