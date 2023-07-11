"use client";

import React, { useContext, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { onBoardingUser } from "@/utils/firebase/data";
import Success from "@/components/Success";

export default function Subscription() {
  const [selectedOption, setSelectedOption] = useState("yearly");
  const [payementSuccess, SetPaymentSuccuess] = useState(false);

  const { userBoardingData, setUserBoardingData } = useContext(UserContext);

  const router = useRouter();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const OpenApplication = () => {
    router.push("/user-stories");
  };

  const handleUserPaymentDetails = (response) => {
    let date = new Date();
    let plan_date = null;
    if ("yearly" === "yearly") {
      date.setFullYear(date.getFullYear() + 1);
      plan_date = date.toISOString();
    } else {
      date.setMonth(date.getMonth() + 3);
      plan_date = date.toISOString();
    }

    console.log("Response", response);

    setUserBoardingData({
      ...userBoardingData,
      subscribe: true,
      payment_id: response.razorpay_payment_id,
      plan: selectedOption,
      subscribe_data: new Date().toISOString(),
      plan_expire_date: plan_date,
    });

    SetPaymentSuccuess(true);
  };

  const makePayment = async (e) => {
    e.preventDefault();
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      //   headers: {
      //     // Authorization: 'YOUR_AUTH_HERE'
      //   },
      body: JSON.stringify({ plan: selectedOption }),
    }).then((t) => t.json());
    const options = {
      name: data.name,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: data.amountDesc,
      // image: logoBase64,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: userBoardingData.username, //your customer's name
        email: userBoardingData.email,
        // contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        handleUserPaymentDetails(response);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
      {!payementSuccess ? (
        <>
          <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
          />
          <div className="flex items-center justify-center h-screen pt-10 sm:pt-0">
            <div className="p-5 flex flex-col items-center justify-center max-w-[1200px]">
              <div className="flex flex-col items-center justify-center mb-4">
                <Image
                  src="/onestepai-logo.png"
                  width={28}
                  height={28}
                  alt="Job Assistance logo"
                  className="my-1"
                />
                <h3 className="text-xl font-bold">Job Assistance Plans</h3>
              </div>
              <div className="flex flex-col items-center justify-center sm:flex-row">
                <div className="w-80 h-72 bg-black-shade rounded-lg p-4 m-2 md:w-96">
                  <p className="text-lg font-semibold pb-2">What we offer</p>
                  <p className="text-xs text-slate-300">
                    These services are included in all plans
                  </p>
                  <div
                    className="grid grid-flow-row pt-2 mt-4 h-[60%] bg-black-input 
              rounded-xl"
                  >
                    <div className="flex items-center px-3">
                      <Image
                        src="/star.svg"
                        alt="star icon"
                        width={20}
                        height={20}
                      />
                      <p className="ml-2">Accurate solution</p>
                    </div>
                    <div className="flex items-center px-3">
                      <Image
                        src="/star.svg"
                        alt="star icon"
                        width={20}
                        height={20}
                      />
                      <p className="ml-2">Weekly assistance</p>
                    </div>
                    <div className="flex items-center px-3">
                      <Image
                        src="/star.svg"
                        alt="star icon"
                        width={20}
                        height={20}
                      />
                      <p className="ml-2">No ads and no extra fees. Ever.</p>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={makePayment}
                  className="w-80 h-72 bg-black-shade rounded-lg p-4 m-2 md:w-96"
                >
                  <p className="text-lg font-semibold pb-2">Choose a plan</p>
                  <p className="text-xs text-slate-300">
                    Select a plan that best suits your need
                  </p>
                  <div className="grid grid-flow-row mt-6 h-[50%]">
                    <label
                      className={`flex items-center justify-start px-3 
                bg-black-input rounded-xl mb-1 
                    ${
                      selectedOption === "yearly"
                        ? "border-2 border-blue-500"
                        : ""
                    }
                `}
                    >
                      <input
                        type="radio"
                        value="yearly"
                        checked={selectedOption === "yearly"}
                        onChange={handleOptionChange}
                      />
                      <div className="flex flex-col items-start justify-center ml-4">
                        <p className="">Yearly</p>
                        <p className="text-xs text-slate-300">₹ 9,999</p>
                      </div>
                    </label>
                    <label
                      className={`flex items-center justify-start px-3 
                bg-black-input rounded-xl mb-1 
                    ${
                      selectedOption !== "yearly"
                        ? "border-2 border-blue-500"
                        : ""
                    }
                `}
                    >
                      <input
                        type="radio"
                        value="three months"
                        checked={selectedOption === "three months"}
                        onChange={handleOptionChange}
                      />
                      <div className="flex flex-col items-start justify-center ml-4">
                        <p className="">3 months</p>
                        <p className="text-xs text-slate-300">₹ 2,999</p>
                      </div>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-sky-400 to-indigo-700 
                w-full py-2 mt-3 rounded-full"
                  >
                    Make payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Success OpenApplication={OpenApplication} />
      )}
    </>
  );
}
