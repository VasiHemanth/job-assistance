"use client";

import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userBoardingData, setUserBoardingData] = useState({
    userId: "",
    username: "",
    email: "",
    created_at: "",
    subscribe: false,
    payment_id: "",
    plan: "",
    subscribe_data: null,
    plan_expire_date: null,
  });

  return (
    <UserContext.Provider value={{ userBoardingData, setUserBoardingData }}>
      {children}
    </UserContext.Provider>
  );
};
