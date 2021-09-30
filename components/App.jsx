import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./Search";
import Header from "./Header";
import { useAuth } from "../hooks/useAuth";
import { AppContextProvider } from "../context/appContext";

const AppView = styled.View`
  background-color: #cdedcc;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const App = () => {
  const { isLoading } = useAuth();

  return (
    <AppView>
      <Header />
      {isLoading ? <Text>Loading...</Text> : <Search />}
    </AppView>
  );
};

const AppWrapper = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
