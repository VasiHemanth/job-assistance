"use client";
import React, { useEffect, useState, useContext, useRef } from "react";

import Prompt from "@/components/Prompt";
import Message from "@/components/Message";

import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/MessageLoadingContext";
import { getData, saveReference } from "@/utils/firebase/data";

function UserStories() {
  const [messages, setMessages] = useState(null);
  const chatRef = useRef(null);

  const { currentUser, userImage, uid } = useContext(AuthContext);
  const { startLoading, finishLoading } = useContext(LoadingContext);

  useEffect(() => {
    getData(uid).then((result) => {
      setMessages(result);
    });
  }, [uid]);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    // getData()
  }, [messages]);

  async function handleSubmit(prompt) {
    if (prompt.trim().length === 0) {
      return;
    }

    startLoading();

    const human = {
      created_at: new Date().toISOString(),
      author: currentUser,
      avatar: userImage,
      text: prompt,
    };

    setMessages((messages) => {
      return [
        ...messages,
        {
          created_at: new Date().toISOString(),
          author: currentUser,
          avatar: userImage,
          text: prompt,
        },
      ];
    });

    try {
      const response = await fetch(`/api/completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const responseData = await response.json();

      let resData = responseData["solution"];

      const ai = {
        created_at: new Date().toISOString(),
        author: "ai_",
        avatar: "/onestepai-logo.png",
        text: resData,
      };
      setMessages((messages) => {
        return [
          ...messages,
          {
            created_at: new Date().toISOString(),
            author: "ai",
            avatar: "/onestepai-logo.png",
            text: resData,
          },
        ];
      });

      try {
        saveReference(uid, human, ai);
      } catch (e) {
        console.log(error);
      }
      // console.log("messages", messages);
    } catch (error) {
      // console.log("handle submit error");
      console.error("Error", error);
    }
    finishLoading();
  }
  return (
    <div className="w-full h-screen">
      <div ref={chatRef} className="w-full h-5/6 overflow-auto scrollbar-hide">
        <div className="py-5 px-10">
          {messages &&
            messages.map((message, i) => (
              <Message
                key={message.created_at}
                idx={i}
                author={message.author}
                avatar={message.avatar}
                text={message.text}
              />
            ))}
        </div>
      </div>

      <form className="px-10 bottom-6 fixed w-full">
        <Prompt handleSubmit={handleSubmit} />
      </form>
    </div>
  );
}

export default UserStories;
