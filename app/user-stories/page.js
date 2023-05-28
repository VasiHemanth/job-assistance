"use client";
import React, { useState } from "react";

import { openai } from "@/utils/openai/init";
import SyntaxFormatter from "../../components/SyntaxFormatter";
import Prompt from "@/components/Prompt";

function UserStories() {
  // const [prompt, setPrompt] = useState("");
  const [arrayOfData, setArrayOfData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(prompt) {
    try {
      setLoading(true);
      console.log(openai);
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0,
        max_tokens: 640,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(response);
      let resData = response.data.choices[0].text;
      console.log(resData);
      setArrayOfData([
        ...arrayOfData,
        { sender: "user", data: prompt },
        { sender: "AI", data: resData },
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="w-full  h-screen">
      <div className="w-full h-5/6 overflow-auto scrollbar-hide">
        <div className="py-5 px-10">Content Goes here</div>
      </div>
      <div className="h-1/6 bg-gray-700">
        <form className="px-10 bottom-6 fixed w-4/5">
          <Prompt handleSubmit={handleSubmit} />
        </form>
      </div>

      {/* <div className="overflow-auto scrollbar-hide">
        {arrayOfData.map((item, index) => (
          <div
            key={index}
            className={`${item.sender == "AI" ? "bg-black-bh" : ""} px-10 py-0`}
          >
            {item.sender == "user" ? (
              <div className="py-3">{item.data}</div>
            ) : (
              <div className="">
                <pre>{item.data}</pre>
              </div>
            )}
          </div>
        ))}
      </div> */}

      {/* <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <Prompt handleSubmit={handleSubmit} />
      </form> */}
    </div>
  );
}

export default UserStories;
