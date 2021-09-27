import React, { useState } from "react";
import styled from "styled-components/native";
import { Button, FlatList, Text } from "react-native";
import {
  getMatchingSongs,
  getSavedSongsCount,
  reloadSavedSongs,
} from "../queries/songs";
import Song from "./Song";
import { useMutation, useQuery } from "react-query";

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

const Search = ({ userId }) => {
  const [bpm, setBpm] = useState();

  const getSavedSongsCountQuery = useQuery(["getSavedSongsCount", userId], () =>
    userId ? getSavedSongsCount(userId) : undefined
  );
  const reloadSavedSongsMutation = useMutation(
    "reloadSavedSongs",
    reloadSavedSongs
  );

  const getMatchingSongsQuery = useQuery(
    "getMatchingSongs",
    () => getMatchingSongs(bpm),
    { enabled: false }
  );

  const handleChange = (text) => setBpm(text);

  const handleSearch = () => getMatchingSongsQuery.refetch();

  const savedSongsCount =
    reloadSavedSongsMutation.data?.total ?? getSavedSongsCountQuery.data?.count;

  return (
    <>
      <Text>Total saved songs: {savedSongsCount}</Text>

      {reloadSavedSongsMutation.isLoading ? (
        <Loading>Loading all of your saved songs...</Loading>
      ) : (
        <>
          <Button
            onPress={reloadSavedSongsMutation.mutate}
            title="Reload saved songs"
          />

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

          <FlatList
            data={getMatchingSongsQuery.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Song song={item} getMatchingSongsQuery={getMatchingSongsQuery} />
            )}
          />
        </>
      )}
    </>
  );
};

export default Search;
