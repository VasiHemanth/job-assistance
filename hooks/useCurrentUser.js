// hooks/useCurrentUser.js

import { useEffect, useState } from "react";
import { auth } from "../utils/firebase/auth";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userImage, setUserImage] = useState("/profile.svg");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user.displayName);
      setUserImage(user.photoURL);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, userImage, isLoading };
};
