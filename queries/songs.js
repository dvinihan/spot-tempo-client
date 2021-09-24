import axios from "axios";
import { useQuery } from "react-query";
import { serverUrl } from "../constants/constants";

export const useSavedSongsCount = () =>
  useQuery("getSavedSongsCount", async () => {
    const { data } = await axios.get(`${serverUrl}/getSavedSongsCount`);
    return data;
  });

export const useMatchingSongs = ({ bpm }) =>
  useQuery(
    "getMatchingSongs",
    async () => {
      const { data } = await axios.get(
        `${serverUrl}/getMatchingSongs?bpm=${bpm}&start=0&end=100`
      );
      return data;
    },
    { enabled: false }
  );
