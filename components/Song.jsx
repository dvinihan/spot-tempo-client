import { truncate } from "lodash";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useMutation } from "react-query";
import styled from "styled-components/native";
import { addSong, removeSong } from "../queries/songs";

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
const LoadingView = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 0;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Song = ({ song, getMatchingSongsQuery }) => {
  const [isLoading, setIsLoading] = useState(false);

  // this is needed to prevent lag in color change
  useEffect(() => {
    if (!getMatchingSongsQuery.isRefetching) {
      setIsLoading(false);
    }
  }, [getMatchingSongsQuery.isRefetching]);

  const addSongMutation = useMutation("addSong", addSong);
  const removeSongMutation = useMutation("removeSong", removeSong);

  const shiftSong = () => {
    const mutation = song.isInDestinationPlaylist
      ? removeSongMutation
      : addSongMutation;

    setIsLoading(true);
    mutation.mutate({ songUri: song.uri, getMatchingSongsQuery });
  };

  const truncatedSongName = truncate(song.name, { length: 30 });
  const truncatedArtistName = truncate(song.artist, {
    length: 30,
  });

  return (
    <>
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

        {isLoading && (
          <LoadingView>
            <ActivityIndicator size="large" />
          </LoadingView>
        )}
      </SongView>
    </>
  );
};

export default Song;
