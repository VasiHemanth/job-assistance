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
      setCurrentUser(user.displayName);
      setUserImage(user.photoURL);
      setUid(user.uid);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, userImage, uid, isLoading };
};
