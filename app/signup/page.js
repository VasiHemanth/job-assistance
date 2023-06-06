"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Auth from "@/components/Auth";

const SignUpPageDetails = {
  title: "Create your account",
  show: false,
};

export default function SignUp() {
  const router = useRouter();

  const loggedIn = (details) => {
    console.log(details);

    router.push("/user-stories");
  };

  return <Auth details={SignUpPageDetails} loggedIn={loggedIn} />;
}
