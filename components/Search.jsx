import React, { useState } from "react";
import styled from "styled-components/native";
import { Button, FlatList } from "react-native";
import {
  getMatchingSongs,
  getSavedSongsCount,
  reloadSavedSongs,
} from "../queries/songs";
import Song from "./Song";
import { useMutation, useQuery } from "react-query";

const TotalSongs = styled.Text`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
`;
const ReloadButtonView = styled.View`
  margin-bottom: 10px;
`;
const SearchBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const SearchInput = styled.TextInput`
  font-size: 18px;
  border: 1px solid black;
  margin-right: 15px;
  width: 120px;
  padding: 5px;
  font-weight: 500;
`;
const SearchButton = styled.Button``;
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
      <TotalSongs>Total saved songs: {savedSongsCount}</TotalSongs>

      {reloadSavedSongsMutation.isLoading ? (
        <Loading>Loading all of your saved songs...</Loading>
      ) : (
        <>
          <ReloadButtonView>
            <Button
              onPress={reloadSavedSongsMutation.mutate}
              title="Reload saved songs"
            />
          </ReloadButtonView>

          <SearchBar>
            <SearchInput
              id="searchbar"
              type="text"
              onChangeText={handleChange}
              placeholder="BPM"
              placeholderTextColor="white"
            />
            <SearchButton title="Search" onPress={handleSearch}>
              <SearchText>Search</SearchText>
            </SearchButton>
          </SearchBar>

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
