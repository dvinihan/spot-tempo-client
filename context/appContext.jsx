import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(AppContextProvider);

export const AppContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [userId, setUserId] = useState();

  return (
    <AppContext.Provider
      value={{ accessToken, setAccessToken, userId, setUserId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
