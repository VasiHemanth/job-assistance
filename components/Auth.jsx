"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  signInUserWithEmailAndPassword,
  signInWithGithub,
  signInWithGoogle,
} from "@/utils/firebase/auth";
import Loader from "./Loader";

export default function Auth(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const credUser = await signInUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    console.log("credUser", credUser);
    if (credUser.user) {
      props.loggedIn(credUser);
      setIsLoading(false);
    }
  };

  // Github Acknowledgement
  const handleGithub = async () => {
    setIsLoadingGithub(true);
    const githubData = await signInWithGithub();
    let val = null;
    if (githubData.user) {
      val = props.loggedIn(githubData);
    } else {
      // console.log(githubData);
    }
    setIsLoadingGithub(val);
  };

  // Github Acknowledgement
  const handleGoogle = async () => {
    setIsLoadingGoogle(true);
    const googleData = await signInWithGoogle();
    // console.log(googleData);
    if (googleData.user) {
      props.loggedIn(googleData);
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-sm sm:text-sm">
      <div
        className="p-8 shadow-lg rounded-lg bg-black-shade 
        w-full sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/onestepai-logo.png"
            width={28}
            height={28}
            alt="Job Assistance logo"
            className="my-1"
          />
          <h3 className="text-xl font-bold">{props.details.title}</h3>
        </div>
        <div className="grid grid-flow-col gap-4 my-5">
          <button
            className="border-2 rounded-md border-black-bh p-2 hover:bg-black-bh
            hover:border-gray-400"
            onClick={handleGoogle}
          >
            {isLoadingGoogle ? (
              <Loader loader="loader_1" />
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  src="/google.svg"
                  width={28}
                  height={28}
                  alt="Google Icon"
                  className="mx-1"
                />
                <span className="text-sm">Google</span>
              </div>
            )}
          </button>
          <button
            className="border-2 rounded-md border-black-bh p-2 hover:bg-black-bh
            hover:border-gray-400
            "
            onClick={handleGithub}
          >
            {" "}
            {isLoadingGithub ? (
              <div className="flex items-center justify-center">
                <Loader loader="loader_1" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  src="/github.svg"
                  width={26}
                  height={26}
                  alt="Github Icon"
                  className="mx-1"
                />
                Github
              </div>
            )}
          </button>
        </div>
        <div className="flex items-center">
          <hr className="flex-grow border-t border-[#33363d]" />
          <span className="px-4">or continue with</span>
          <hr className="flex-grow border-t border-[#33363d]" />
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-100 font-medium mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full px-3 py-2 border-2 text-sm
              border-black-shade bg-black-input rounded-md 
              focus:outline-none focus:ring-2 focus:ring-black-bh"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-100 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className={`w-full px-3 py-2 border-2 text-sm
                border-black-shade bg-black-input rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#33363d]`}
                placeholder="Enter your password"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {isFocused && (
                <button
                  type="button"
                  className={`absolute top-1/2 right-4 transform -translate-y-1/2 
                  `}
                  onClick={togglePasswordVisibility}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {passwordVisible ? (
                    <Image
                      src="/eye-slash.svg"
                      width={20}
                      height={20}
                      alt="Eye slash Icon"
                    />
                  ) : (
                    <Image
                      src="/eye.svg"
                      width={20}
                      height={20}
                      alt="Eye Icon"
                    />
                  )}
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold px-4 py-2 
            rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isLoading ? <Loader loader="loader_2" /> : "Continue"}
          </button>
        </form>
        <p className="px-4 py-2 flex items-center justify-center">
          {props.details.show && (
            <>
              Not a member?
              <Link
                href={"/signup"}
                className="text-blue-500 px-1 underline cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
