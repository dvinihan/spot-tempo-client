const ENV = {
  dev: {
    serverUrl: "http://localhost:5000",
    redirectUrl: "http://localhost:3000",
  },
  prod: {
    serverUrl: "https://spot-tempo-server.herokuapp.com",
    redirectUrl: "https://spot-tempo-client.herokuapp.com",
  },
};

const getEnvVars = () => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
