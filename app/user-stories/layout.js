"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { LoadingContextProvider } from "../context/MessageLoadingContext";

export default function StoryLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  const { currentUser } = useContext(AuthContext);
  console.log("From auth context", currentUser);

  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [currentUser, authenticated]);

  const handleLogin = () => {
    router.push("login");
  };

  return (
    <LoadingContextProvider>
      <section className="h-screen overflow-hidden">
        {authenticated ? (
          <>
            <div>
              <Navbar />
            </div>
            <div className="w-full">{children}</div>
          </>
        ) : (
          <div
            onClick={handleLogin}
            className="grid items-center justify-center h-full"
          >
            <div className="flex flex-col items-center justify-center">
              User must login before going further. Please click on Login!
              <button
                className="w-30 bg-blue-500 text-white font-semibold px-4 py-2 mt-5 
            rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </section>
    </LoadingContextProvider>
  );
}
