import React from "react";
import styled from "styled-components/native";
import { Button, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./Search";
import Header from "./Header";
import { useAuth } from "../hooks/useAuth";

const AppView = styled.View`
  background-color: #cdedcc;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const App = () => {
  const { accessToken, isLoading, login, userId } = useAuth();

  return (
    <AppView>
      <Header />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : accessToken ? (
        <Search userId={userId} />
      ) : (
        <Button onPress={login} title="Log in to Spotify" />
      )}
    </AppView>
  );
};

const AppWrapper = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default AppWrapper;
