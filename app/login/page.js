"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Auth from "@/components/Auth";

const loginPageDetails = {
  title: "Sign in to your account",
  show: true,
};

export default function Login() {
  const router = useRouter();

  const loggedIn = (details) => {
    // console.log(details);

    router.push("/user-stories");
    return false;
  };

  return <Auth details={loginPageDetails} loggedIn={loggedIn} />;
}
