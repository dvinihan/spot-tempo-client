import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Search from "./Search";
import axios from "axios";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { clientId, serverUrl } from "../constants/constants";
import Header from "./Header";
import { Button } from "react-native";

const AppWrapper = styled.View`
  background-color: #cdedcc;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const App = () => {
  const [accessToken, setAccessToken] = useState();

  // Check if user is already logged in
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${serverUrl}/getAccessToken`);
      setAccessToken(data.access_token);
    })();
  }, []);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: [
        "playlist-read-private",
        "playlist-modify-private",
        "playlist-modify-public",
        "user-library-read",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    (async () => {
      if (!accessToken && response?.type === "success") {
        const { code } = response.params;
        const { data } = await axios.post(`${serverUrl}/login`, {
          code,
          redirect_uri: request.redirectUri,
        });
        setAccessToken(data.access_token);
      }
    })();
  }, [request, response, accessToken]);

  return (
    <AppWrapper>
      <Header />
      {accessToken ? (
        <Search />
      ) : (
        <Button onPress={promptAsync} title="Log in to Spotify" />
      )}
    </AppWrapper>
  );
};

export default App;
