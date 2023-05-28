import { useState } from "react";

export default function Prompt({ handleSubmit }) {
  const [promptInput, setPromptInput] = useState("");

  return (
    <textarea
      onChange={(e) => setPromptInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit(promptInput);
          setPromptInput("");
        }
      }}
      rows="2"
      className="w-full p-2.5 text-sm text-gray-900 
        bg-slate-200 rounded-lg border border-gray-300"
      placeholder="Write your prompt there..."
      value={promptInput}
    />
  );
}
