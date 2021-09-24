import React, { useState } from "react";
import { SongList } from "./SongList";
import styled from "styled-components/native";
import { Button, Text } from "react-native";
import { useMatchingSongs, useSavedSongsCount } from "../queries/songs";
import { useReloadSavedSongs } from "../mutations/songs";

const SearchArea = styled.View`
  display: flex
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SearchBar = styled.TextInput`
  font-size: 24px;
  border: 1px solid black;
  margin: 5px;
  width: 120px;
  padding: 12px;
`;
const SearchButton = styled.Button`
  padding: 15px;
`;
const SearchText = styled.Text`
  padding: 15px;
`;
const Loading = styled.Text`
  margin-top: 20px;
`;

const Search = () => {
  const [bpm, setBpm] = useState();

  const getSavedSongsCountQuery = useSavedSongsCount();
  const reloadSavedSongsMutation = useReloadSavedSongs();

  const getMatchingSongsQuery = useMatchingSongs({ bpm });

  const reloadSavedSongs = () => reloadSavedSongsMutation.mutate();

  const handleChange = (text) => setBpm(text);

  const handleSearch = () => getMatchingSongsQuery.refetch();

  // const addSongToDestination = async (song) => {
  //   try {
  //     await axios.post(`${serverUrl}/addTrack`, {
  //       trackId: song.uri,
  //     });
  //     setDestinationSongs([...destinationSongs, song]);
  //     setOriginSearchResults(
  //       originSearchResults.filter((item) => item.id !== song.id)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeSongFromDestination = async (song, position) => {
  //   try {
  //     await axios.post(`${serverUrl}/removeTrack`, {
  //       trackId: song.uri,
  //       position,
  //     });

  //     setDestinationSongs(
  //       destinationSongs.filter(
  //         (track, index) => track.id !== song.id && index !== position
  //       )
  //     );
  //     if (song.tempo > bpm - 5 && song.tempo < bpm + 5) {
  //       setOriginSearchResults([...originSearchResults, song]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const savedSongsCount =
    reloadSavedSongsMutation.data?.total ?? getSavedSongsCountQuery.data?.total;

  return (
    <>
      <Text>Total saved songs: {savedSongsCount}</Text>

      {reloadSavedSongsMutation.isLoading ? (
        <Loading>Loading all of your saved songs...</Loading>
      ) : (
        <>
          <Button onPress={reloadSavedSongs} title="Reload saved songs" />

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

          <SongList
            label="Search Results from Liked Songs"
            songs={getMatchingSongsQuery.data}
            // shiftSong={addSongToDestination}
          />
        </>
      )}
    </>
  );
};
export default Search;
