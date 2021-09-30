import axios from "axios";
import { serverUrl } from "../constants/constants";

export const reloadSavedSongs = async (accessToken) => {
  const { data } = await axios.post(`${serverUrl}/reload`, { accessToken });
  return data;
};

export const getSavedSongsCount = async (accessToken) => {
  const { data } = await axios.get(
    `${serverUrl}/getSavedSongsCount?accessToken=${accessToken}`
  );
  return data;
};

export const getMatchingSongs = async (bpm, accessToken) => {
  const { data } = await axios.get(
    `${serverUrl}/getMatchingSongs?bpm=${bpm}&start=0&end=100&accessToken=${accessToken}`
  );
  return data;
};

export const addSong = async ({
  songUri,
  getMatchingSongsQuery,
  accessToken,
}) => {
  const { data, status } = await axios.post(`${serverUrl}/addSong`, {
    songUri,
    accessToken,
  });
  status === 200 && getMatchingSongsQuery.refetch();
  return data;
};

export const removeSong = async ({
  songUri,
  getMatchingSongsQuery,
  accessToken,
}) => {
  const { data, status } = await axios.delete(
    `${serverUrl}/removeSong?songUri=${songUri}`,
    {
      data: { accessToken },
    }
  );
  status === 200 && getMatchingSongsQuery.refetch();
  return data;
};
