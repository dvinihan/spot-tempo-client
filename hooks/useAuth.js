import { useEffect } from "react";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { clientId } from "../constants/constants";
import { login } from "../queries/auth";
import { useMutation } from "react-query";
import { useAppContext } from "../context/appContext";

maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export const useAuth = () => {
  const { setAccessToken, setUserId } = useAppContext();
  const loginMutation = useMutation("login", login);

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
    // promptAsync will throw error if request has not loaded yet
    if (request) {
      promptAsync();
    }
  }, [request, promptAsync]);

  // Once auth is complete behind the scenes, we can login from our server
  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        const { code } = response.params;
        loginMutation.mutate({ code, redirectUri: request.redirectUri });
      }
    })();
  }, [request, response]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      setAccessToken(loginMutation.data.accessToken);
      setUserId(loginMutation.data.userId);
    }
  });

  return {
    isLoading: loginMutation.isLoading,
  };
};
