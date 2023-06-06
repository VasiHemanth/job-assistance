"use client";
import React, { useState } from "react";

import { useCurrentUser } from "@/hooks/useCurrentUser";

import { serverTimestamp } from "firebase/firestore";

import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "@/utils/firebase/init";

export default function Sample() {
  const { currentUser, userImage, uid } = useCurrentUser();

  const getdata = async () => {
    try {
      const docRef = collection(db, "user-stories", uid, "questions");
      const docSnap = await getDocs(docRef);
      console.log("Get data details", typeof docSnap);
      docSnap.forEach((doc) => {
        console.log(doc.id, " =>", doc.data());
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  const savedata = async () => {
    try {
      const saveDocRef = addDoc(
        collection(db, "user-stories", uid, "questions"),
        {
          author: currentUser,
          questionText: "Check out boy",
          referenceText: "Cool checking out",
          created_at: serverTimestamp(),
        }
      );
    } catch (e) {
      console.log("Save data error", e);
    }
  };

  return (
    <div className="mx-auto p-5 flex justify-center items-center gap-4">
      <div className="p-10 bg-green-300 mx-5" onClick={getdata}>
        GetData
      </div>
      <div className="p-10 bg-green-300 mx-5" onClick={savedata}>
        SaveData
      </div>
    </div>
  );
}
