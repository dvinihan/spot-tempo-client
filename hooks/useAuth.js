import { useEffect } from "react";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { clientId } from "../constants/constants";
import { getAccessToken, getUserId, login } from "../queries/auth";
import { useMutation, useQuery } from "react-query";

maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export const useAuth = () => {
  const accessTokenQuery = useQuery("getAccessToken", getAccessToken);
  const loginMutation = useMutation("login", login);
  const userIdQuery = useQuery("getUserId", getUserId);

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

  // Once auth is complete behind the scenes, we can login to our server
  useEffect(() => {
    (async () => {
      if (!accessTokenQuery.data?.accessToken && response?.type === "success") {
        const { code } = response.params;
        loginMutation.mutate({ code, redirectUri: request.redirectUri });
      }
    })();
  }, [request, response, accessTokenQuery.data?.accessToken]);

  return {
    accessToken:
      accessTokenQuery.data?.accessToken || loginMutation.data?.accessToken,
    isLoading: accessTokenQuery.isLoading || loginMutation.isLoading,
    login: promptAsync,
    userId: userIdQuery.data?.userId || loginMutation.data?.userId,
  };
};
