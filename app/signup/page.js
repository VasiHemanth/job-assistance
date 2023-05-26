import Auth from "@/components/Auth";
import React from "react";

const SignUpPageDetails = {
  title: "Create your account",
  show: false,
};

export default function SignUp() {
  return <Auth details={SignUpPageDetails} />;
}
