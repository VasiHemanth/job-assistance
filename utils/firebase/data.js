import {
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase/init";

export const insertNewUser = async (userId, username, email) => {
  const userDocument = {
    userId: userId,
    username: username,
    email: email,
    created_at: new Date().toISOString(),
    subscribe: false,
    payment_id: "",
    plan: "",
    subscribe_data: null,
    plan_expire_date: null,
  };

  try {
    await setDoc(doc(db, `users`, userId), userDocument);
    return userDocument;
  } catch (error) {
    throw new Error("User not Inserted");
  }
};

export const checkUserExists = async (userId) => {
  try {
    const userStoryRef = doc(db, "users", userId);
    const userStoryDoc = await getDoc(userStoryRef);

    console.log("Checking whether user exists or not");

    let result = { userExist: false, subscribe: false };
    if (userStoryDoc.exists()) {
      const userData = userStoryDoc.data();

      result.userExist = true;
      if (userData.subscribe) {
        result.subscribe = true;
      } else {
        result.subscribe = false;
      }
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    // Handle the error appropriately
    throw new Error("Something went wrong!, User not found");
  }
};

export const getUserData = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userdata = await getDoc(userDocRef);
    console.log(userdata);
  } catch (e) {
    console.error(error);
    throw new Error("failed to fetch data");
  }
};

export const onBoardingUser = async (userdata) => {
  console.log("User Data", userdata);
  console.log("user id", userdata.userId);
  try {
    const updateUserDocRef = doc(db, `users`, userdata.userId);
    await updateDoc(updateUserDocRef, {
      payment_id: userdata.payment_id,
      plan: userdata.plan,
      plan_expire_date: userdata.plan_expire_date,
      subscribe: userdata.subscribe,
      subscribe_data: userdata.subscribe_data,
    });
  } catch (error) {
    throw new Error("User not Inserted");
  }
};

export const saveReference = async (uid, human, ai) => {
  await addDoc(collection(db, `user-stories/${uid}/questions`), human);
  await addDoc(collection(db, `user-stories/${uid}/questions`), ai);
};

export const getData = async (uid) => {
  try {
    const docRef = collection(db, `user-stories/${uid}/questions`);
    const q = query(docRef, orderBy("created_at", "asc"));
    const querySnapshot = await getDocs(q);
    let m = [];
    querySnapshot.forEach((doc) => {
      m.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return m;
  } catch (error) {
    console.error(error);
    throw new Error("failed to fetch data");
  }
};
