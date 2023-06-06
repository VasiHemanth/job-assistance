"use client";

import Nav from "@/components/Nav";
import Navbar from "@/components/Navbar";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function SampleLayout({ children }) {
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    <div>Loading... Please wait!</div>;
  } else {
    return (
      <section className="h-screen overflow-hidden">
        {/* <div className="w-1/5">
          <Nav />
        </div> */}
        <div>
          <Navbar />
        </div>
        <div className="w-full">{children}</div>
        {/* {children} */}
      </section>
    );
  }
}
