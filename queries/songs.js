import axios from "axios";
import { serverUrl } from "../constants/constants";

export const reloadSavedSongs = async () => {
  const { data } = await axios.post(`${serverUrl}/reload`);
  return data;
};

export const getSavedSongsCount = async () => {
  const { data } = await axios.get(`${serverUrl}/getSavedSongsCount`);
  return data;
};

export const getMatchingSongs = async (bpm) => {
  const { data } = await axios.get(
    `${serverUrl}/getMatchingSongs?bpm=${bpm}&start=0&end=100`
  );
  return data;
};
