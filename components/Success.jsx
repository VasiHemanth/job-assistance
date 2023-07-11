import React, { useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/app/context/UserContext";
import { onBoardingUser } from "@/utils/firebase/data";

export default function Success({ OpenApplication }) {
  const { userBoardingData } = useContext(UserContext);

  const OpenApp = () => {
    onBoardingUser(userBoardingData);
    OpenApplication();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center mb-4 mt-20">
        <Image
          src="/Success.svg"
          width={60}
          height={60}
          alt="Job Assistance logo"
          className="my-1"
        />
        <h3 className="text-xl font-bold">Payment Success!</h3>
        <p>Your payment has been successfully done.</p>
        <button
          onClick={OpenApp}
          className="bg-gradient-to-r from-sky-400 to-indigo-700 
                w-full py-2 mt-3 rounded-full"
        >
          Open App
        </button>
      </div>
    </div>
  );
}
