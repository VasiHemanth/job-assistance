"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Auth from "@/components/Auth";
import { checkUserExists } from "@/utils/firebase/data";

const loginPageDetails = {
  title: "Sign in to your account",
  show: true,
};

export default function Login() {
  const router = useRouter();

  const loggedIn = (userLoginDetails) => {
    console.log(userLoginDetails);
    checkUserExists(userLoginDetails["user"].uid).then((result) => {
      console.log(result);
      if (result.userExist && result.subscribe) {
        router.push("/user-stories");
      } else if (result.userExist && !result.subscribe) {
        router.push("/subscription");
      } else {
        router.push("/signup");
      }
    });

    // return false;
  };

  return <Auth details={loginPageDetails} authenticate={loggedIn} />;
}
