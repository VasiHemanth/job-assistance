"use client";

import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { AuthProvider } from "../context/AuthContext";

export default function StoryLayout({ children }) {
  const { currentUser } = useCurrentUser();

  const [authenticated, setAuthenticated] = useState(false);

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
    <section className="h-screen overflow-hidden">
      <AuthProvider>
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
      </AuthProvider>
    </section>
  );
}
