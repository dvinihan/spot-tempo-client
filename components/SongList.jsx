import React from "react";
import Song from "./Song";
import styled from "styled-components/native";
import { Text, FlatList } from "react-native";

const Header = styled.View`
  font-size: 20px;
  padding: 10px;
`;
const List = styled.View`
  width: 50%;
  height: 68%;
`;

export const SongList = ({ label, shiftSong, listName, songs }) => (
  <List>
    <Header>
      <Text>{label}</Text>
    </Header>
    <FlatList
      data={songs.map((song, index) => ({ song, key: index.toString() }))}
      renderItem={({ item, index }) => (
        <Song
          song={item.song}
          shiftSong={shiftSong}
          listName={listName}
          index={index}
        />
      )}
    />
  </List>
);

export default SongList;
