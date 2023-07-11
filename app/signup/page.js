"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import Auth from "@/components/Auth";
import { markdown } from "@/components/constants";
import {
  checkUserExists,
  insertNewUser,
  saveReference,
} from "@/utils/firebase/data";
import { UserContext } from "../context/UserContext";

const SignUpPageDetails = {
  title: "Create your account",
  show: false,
};

export default function SignUp() {
  const router = useRouter();

  const { userBoardingData, setUserBoardingData } = useContext(UserContext);

  const [messages, setMessages] = useState([
    {
      created_at: new Date().toISOString(),
      author: "human",
      avatar: "/profile.svg",
      text: "Hi there, Who are you?",
    },
    {
      created_at: new Date().toISOString() + 0.001,
      author: "ai",
      avatar: "/onestepai-logo.png",
      text: markdown,
    },
  ]);

  const signUpUser = (userSignUpDetails) => {
    console.log("sign Up, checking if user exist or not");
    console.log("User info", checkUserExists(userSignUpDetails["user"].uid));
    checkUserExists(userSignUpDetails["user"].uid).then((result) => {
      if (result.userExist && result.subscribe) {
        console.log("Account already exists. Please login!");
        router.push("/login");
      } else if (result.userExist && !result.subscribe) {
        router.push("/subscription");
      } else {
        const userdata = insertNewUser(
          userSignUpDetails["user"].uid,
          userSignUpDetails["user"].displayName,
          userSignUpDetails["user"].email
        );
        userdata.then((data) => {
          setUserBoardingData({
            ...userBoardingData,
            userId: data.userId,
            username: data.username,
            email: data.email,
            created_at: data.created_at,
          });
          // saveReference(data.userId, messages[0], messages[1]);
        });
        // redirect to payment page
      }
      router.push("/subscription");
    });
  };

  return <Auth details={SignUpPageDetails} authenticate={signUpUser} />;
}
