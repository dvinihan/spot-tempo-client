import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Search from "./Search";
import Axios from "axios";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { clientId, serverUrl } from "../constants/constants";

const AppWrapper = styled.View`
  background-color: #9ec99c;
  width: 100%;
  height: 100%;
`;

maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const App = () => {
  const [accessToken, setAccessToken] = useState();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["user-read-email", "playlist-modify-public"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        const { code } = response.params;

        const accessTokenFromServer = await Axios.post(`${serverUrl}/login`, {
          code,
          redirect_uri: request.redirectUri,
        });

        setAccessToken(accessTokenFromServer);
      } else if (request) {
        promptAsync();
      }
    })();
  }, [request, response]);

  return accessToken ? (
    <AppWrapper>
      <Search />
    </AppWrapper>
  ) : null;
};

export default App;
