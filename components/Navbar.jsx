"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../app/context/AuthContext";

import { useRouter } from "next/navigation";

import { signOutUser } from "@/utils/firebase/auth";

export default function Navbar() {
  const router = useRouter();

  const { currentUser, userImage } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser();
    router.push("/");
  };

  return (
    <div
      className="w-full h-16 px-10 py-5 flex items-center justify-between 
    searchBackground border-b border-gray-500 sticky"
    >
      <p className="font-semibold">Job Assitance</p>
      <div className="flex items-center justify-center">
        <p className="pr-2 text-sm">Hello, {currentUser}</p>
        <div className="relative w-8 h-8">
          <Image
            src={userImage ? userImage : "/profile.svg"}
            alt="add Icon"
            width={30}
            height={30}
          />
        </div>
        <button
          className="ml-2 px-3 py-2 cursor-pointer text-sm bg-blue-500 text-white font-semibold
            rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
