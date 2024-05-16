"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../app/context/AuthContext";

import { useRouter } from "next/navigation";

import { signOutUser } from "@/utils/firebase/auth";
// import { deleteChat } from "@/utils/firebase/helper";

export default function Navbar() {
  const [toggleOptions, setToggleOptions] = useState(false);
  const router = useRouter();
  const { currentUser, userImage, uid } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser();
    router.push("/");
  };

  return (
    <div
      className="w-full h-16 px-10 py-5 flex items-center justify-between 
    searchBackground border-b border-gray-700 sticky"
    >
      <p className="font-semibold">Job Assitance</p>
      <div className="flex items-center justify-center">
        <p className="pr-2 text-sm">Hello, {currentUser}</p>
        <div
          className="relative w-8 h-8"
          title="Options"
          onClick={() => setToggleOptions(!toggleOptions)}
        >
          <Image
            src={userImage ? userImage : "/profile.svg"}
            alt="add Icon"
            width={30}
            height={30}
          />
          {toggleOptions && (
            <div
              className=" absolute right-3 w-40 bg-black-input 
             text-sm text-white m-2 border border-gray-800 rounded-md"
            >
              {/* <p
                className="p-3 hover:bg-neutral-900 text-red-600"
                title="Delete Chat"
                onClick={() => deleteChat(uid)}
              >
                Delete Chat
              </p> */}
              <p
                onClick={handleSignOut}
                className="p-3 hover:bg-neutral-900"
                title="Sign Out"
              >
                Sign out
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
