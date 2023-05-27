"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
// import { auth } from "../firebase"; // Import your Firebase authentication instance

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up an observer to listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  // Provide the currentUser and loading state to child components
  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
