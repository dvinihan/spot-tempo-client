import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const SongItem = styled.TouchableHighlight`
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.listName === 'searchResults' ? '#f0eeb7' : '#c8e2ee'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const AddRemove = styled.Text`
  font-size: 25px;
  margin-left: 6px;
  margin-bottom: 2px;
`
const SongInfo = styled.Text`
  margin: 0 12px;
`
const SongName = styled.Text`
  font-weight: 600;
`
const Bpm = styled.Text`
  display: flex;
  text-align: center;
  width: 35px;
`

export const Song = ({ listName, shiftSong, song, index }) => (
  <SongItem listName={listName} onPress={() => shiftSong(song, index)}>
    <View>
      <AddRemove>{listName === 'searchResults' ? '+' : '-'}</AddRemove>

      <SongInfo>
        <SongName>{song.name}</SongName> by {song.album.artists[0].name}
      </SongInfo>
      <Bpm>{song.tempo} BPM</Bpm>
    </View>
  </SongItem>
)

export default Song
