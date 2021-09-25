import axios from "axios";
import { serverUrl } from "../constants/constants";

export const reloadSavedSongs = async () => {
  const { data } = await axios.post(`${serverUrl}/reload`);
  return data;
};

export const getSavedSongsCount = async (userId) => {
  const { data } = await axios.get(
    `${serverUrl}/getSavedSongsCount?user=${userId}`
  );
  return data;
};

export const getMatchingSongs = async (bpm) => {
  const { data } = await axios.get(
    `${serverUrl}/getMatchingSongs?bpm=${bpm}&start=0&end=100`
  );
  return data;
};

export const addSong = async ({ songUri, getMatchingSongsQuery }) => {
  const { data, status } = await axios.post(`${serverUrl}/addSong`, {
    songUri,
  });
  status === 200 && getMatchingSongsQuery.refetch();
  return data;
};

export const removeSong = async ({ songUri, getMatchingSongsQuery }) => {
  const { data, status } = await axios.delete(
    `${serverUrl}/removeSong?songUri=${songUri}`
  );
  status === 200 && getMatchingSongsQuery.refetch();
  return data;
};
