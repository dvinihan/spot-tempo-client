import React, { useState, useEffect } from "react";
import { SongList } from "./SongList";
import styled from "styled-components/native";
import Axios from "axios";
import { serverUrl } from "../constants/constants";

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;
const Title = styled.Text`
  font-size: 25px;
`;
const HeaderText = styled.Text`
  text-align: center;
  margin: 20px 60px;
`;
const SearchArea = styled.View`
  display: flex
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 55%;
`;
const SearchBar = styled.TextInput`
  font-size: 24px;
  border: 1px solid black;
  margin: 5px;
  width: 120px;
  padding: 12px;
`;
const ListsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const SearchButton = styled.Button`
  padding: 15px;
`;
const SearchText = styled.Text`
  padding: 15px;
`;
const Loading = styled.Text``;

const Search = () => {
  const [destinationSongs, setDestinationSongs] = useState([]);
  const [originSearchResults, setOriginSearchResults] = useState([]);
  const [bpm, setBpm] = useState();
  const [isLoading, setIsLoading] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    const getInitialSongs = async () => {
      setIsLoading(true);

      const firstOriginBatch = await Axios.post(
        `${serverUrl}/getNextOriginSongs`,
        {
          start: 0,
          end: 100,
        }
      );
      const firstDestinationBatch = await Axios.post(
        `${serverUrl}/getNextDestinationSongs`,
        {
          start: 0,
          end: 100,
        }
      );

      setOriginSearchResults(firstOriginBatch.data);
      setDestinationSongs(firstDestinationBatch.data);

      setIsLoading(false);
    };

    getInitialSongs();
  }, []);

  const handleSearch = async () => {
    const matchingTracks = await Axios.post(`${serverUrl}/getMatchingSongs`, {
      bpm: text,
      start: 0,
      end: 100,
    });

    setBpm(text);
    setOriginSearchResults(matchingTracks.data);
  };

  const handleChange = (text) => setText(text);

  const addSongToDestination = async (song) => {
    try {
      await Axios.post(`${serverUrl}/addTrack`, {
        trackId: song.uri,
      });
      setDestinationSongs([...destinationSongs, song]);
      setOriginSearchResults(
        originSearchResults.filter((item) => item.id !== song.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeSongFromDestination = async (song, position) => {
    try {
      await Axios.post(`${serverUrl}/removeTrack`, {
        trackId: song.uri,
        position,
      });

      setDestinationSongs(
        destinationSongs.filter(
          (track, index) => track.id !== song.id && index !== position
        )
      );
      if (song.tempo > bpm - 5 && song.tempo < bpm + 5) {
        setOriginSearchResults([...originSearchResults, song]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Title>Spotify BPM Picker</Title>
      <HeaderText>
        This app will allow you to search for songs by BPM in your "SpotTempo"
        playlist, and add them to your "SpotTempo Workout" playlist.
      </HeaderText>

      <SearchArea>
        <SearchBar
          id="searchbar"
          type="text"
          onChangeText={handleChange}
          placeholder="BPM"
          placeholderTextColor="white"
        />
        <SearchButton title="Search" onPress={handleSearch}>
          <SearchText>Search</SearchText>
        </SearchButton>
      </SearchArea>

      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <ListsContainer>
          <SongList
            label="Search Results from Liked Songs"
            songs={originSearchResults}
            shiftSong={addSongToDestination}
            listName="searchResults"
          />

          <SongList
            label="SpotTempo Workout playlist"
            songs={destinationSongs}
            shiftSong={removeSongFromDestination}
            listName="playlist"
          />
        </ListsContainer>
      )}
    </Wrapper>
  );
};
export default Search;
