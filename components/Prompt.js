import { useState } from "react";

export default function Prompt({ handleSubmit }) {
  const [promptInput, setPromptInput] = useState("");

  return (
    <div className="flex item-center justify-between ">
      <textarea
        onChange={(e) => setPromptInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(promptInput);
            setPromptInput("");
          }
        }}
        rows="1"
        className="w-full p-2.5 text-sm 
          promptBackground rounded-lg text-white focus:outline-none"
        placeholder="Write your prompt there..."
        value={promptInput}
      ></textarea>
    </div>
  );
}
