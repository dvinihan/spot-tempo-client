import { truncate } from "lodash";
import React from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

const SongView = styled.View`
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isInDestinationPlaylist ? "#358c4e" : "#c8e2ee"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Touchable = styled.TouchableHighlight`
  text-align: center;
  width: 50px;
`;
const Spacer = styled.View`
  width: 50px;
`;
const AddRemoveText = styled.Text`
  font-size: 50px;
`;
const SongInfo = styled.View`
  margin: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SongName = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const SongDetail = styled.Text`
  font-size: 20px;
`;

export const Song = ({ song }) => {
  const shiftSong = () => {};

  const truncatedSongName = truncate(song.name, { length: 30 });

  const truncatedArtistName = truncate(song.artist, {
    length: 30,
  });

  return (
    <SongView isInDestinationPlaylist={song.isInDestinationPlaylist}>
      <Touchable onPress={() => shiftSong(song)}>
        <AddRemoveText>
          {song.isInDestinationPlaylist ? "-" : "+"}
        </AddRemoveText>
      </Touchable>

      <SongInfo>
        <SongName>{truncatedSongName}</SongName>
        <SongDetail>{truncatedArtistName}</SongDetail>
        <SongDetail>{song.tempo} BPM</SongDetail>
      </SongInfo>

      <Spacer />
    </SongView>
  );
};

export default Song;
