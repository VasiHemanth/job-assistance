import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-sm">
      <Image
        src="/onestepai-logo.png"
        width={40}
        height={40}
        alt="Company logo"
        className="mb-8"
      />
      <h1 className="mb-1">Welcome to Job Assistance</h1>
      <h1 className="mb-5">
        Login with your Job Assistance account to continue
      </h1>
      <div className="space-x-4">
        <Link
          href="/login"
          className="w-full bg-blue-500 text-white px-4 py-2
              rounded-[5px] hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="w-full bg-blue-500 text-white px-5 py-2
              rounded-[5px] hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
