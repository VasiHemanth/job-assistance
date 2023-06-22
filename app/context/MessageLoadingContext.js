import React, { createContext, useState } from "react";

// Create the LoadingContext
export const LoadingContext = createContext();

// Create the LoadingContextProvider component
export const LoadingContextProvider = ({ children }) => {
  const [isMsgLoading, setIsMsgLoading] = useState(false);

  // Function to set isMsgLoading to true
  const startLoading = () => {
    setIsMsgLoading(true);
  };

  // Function to set isMsgLoading to false
  const finishLoading = () => {
    setIsMsgLoading(false);
  };

  // Value object to be passed to the context provider

  return (
    <LoadingContext.Provider
      value={{ isMsgLoading, startLoading, finishLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
