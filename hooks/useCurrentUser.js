// hooks/useCurrentUser.js

import { useEffect, useState } from "react";
import { auth } from "../utils/firebase/auth";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userImage, setUserImage] = useState("/profile.svg");
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    return () => unsubscribe();
  }, []);

  return { currentUser, userImage, uid, isLoading };
};
