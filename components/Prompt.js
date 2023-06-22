import { LoadingContext } from "@/app/context/MessageLoadingContext";
import Image from "next/image";
import { useState, useContext } from "react";

export default function Prompt({ handleSubmit }) {
  const [promptInput, setPromptInput] = useState("");
  const { isMsgLoading } = useContext(LoadingContext);
  // const [messageLoading, setMessageLoading] = useState(false);

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    handleSubmit(promptInput);
    setPromptInput("");
  };

  return (
    <div className="flex item-center justify-between">
      <textarea
        onChange={(e) => setPromptInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleButtonSubmit(e);
          }
        }}
        rows="1"
        className="w-full p-2.5 text-sm 
          promptBackground rounded-l-lg text-white focus:outline-none"
        placeholder="Write your prompt there..."
        value={promptInput}
      ></textarea>
      <button
        className="right-2 bottom-0 px-3 py-2 bg-blue-500   
            rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={(e) => handleButtonSubmit(e)}
      >
        {/* <Image src="/send.svg" width={20} height={20} alt="Send Icon" /> */}

        {isMsgLoading ? (
          <div className="message-loader"></div>
        ) : (
          <Image src="/send.svg" width={20} height={20} alt="Send Icon" />
        )}
      </button>
    </div>
  );
}
