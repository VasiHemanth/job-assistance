"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
// import { auth } from "../firebase"; // Import your Firebase authentication instance

import { auth } from "../../utils/firebase/auth";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userImage, setUserImage] = useState("/profile.svg");
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up an observer to listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.displayName === null ? 'Iron Man' : user.displayName || 'Hey User');
        setUserImage(user.photoURL || "/profile.svg");
        setUid(user.uid || "");
      } else {
        setCurrentUser(null);
        setUserImage("/profile.svg");
        setUid("");
      }
      setIsLoading(false);
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  // Provide the currentUseR and loading state to child components
  return (
    <AuthContext.Provider value={{ currentUser, userImage, uid, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
