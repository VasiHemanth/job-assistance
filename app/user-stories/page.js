"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { openai } from "@/utils/openai/init";
import { db } from "@/utils/firebase/init";

import Prompt from "@/components/Prompt";
import Message from "@/components/Message";

import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/MessageLoadingContext";
import EnvAPI from "@/services/EnvAPI";

function UserStories() {
  const markdown = `
  Hi! I'm **Jarvis**, the coding assistant. I'm here to help you with any questions you have related to programming. 
  Feel free to ask me anything and I'll do my best to answer it.


  Here is an Example:


  Create a python code to print all the elements in the list

  ~~~python
  list = [1, 2, 3, 4, 5]

  for number in list:
      print(number)
`;

  const chatRef = useRef(null);
  const [messageLoading, setMessageLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      created_at: new Date().toISOString(),
      author: "human",
      avatar: "/profile.svg",
      text: "Hi there, Who are you?",
    },
    {
      created_at: new Date().toISOString() + 0.001,
      author: "ai",
      avatar: "/onestepai-logo.png",
      text: markdown,
    },
  ]);

  const { currentUser, userImage, uid, isLoading } = useContext(AuthContext);
  const { startLoading, finishLoading } = useContext(LoadingContext);

  const apiUrl = EnvAPI();

  const router = useRouter();

  const saveReference = async (human, ai) => {
    await addDoc(collection(db, `user-stories/${uid}/questions`), human);
    await addDoc(collection(db, `user-stories/${uid}/questions`), ai);
  };

  const getData = async () => {
    const docRef = collection(db, `user-stories/${uid}/questions`);
    const q = query(docRef, orderBy("created_at", "asc"));
    const querySnapshot = await getDocs(q);

    let m = [];
    querySnapshot.forEach((doc) => {
      m.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setMessages(m);
    // console.log("messages", messages);
  };

  const insertUser = async (userId, username) => {
    const userDocument = {
      username: username,
    };

    await setDoc(doc(db, `users`, userId), userDocument);
  };

  const checkUserExists = async (userId) => {
    try {
      const userStoryRef = doc(db, "users", userId);
      const userStoryDoc = await getDoc(userStoryRef);

      // console.log(userStoryDoc.exists());

      if (userStoryDoc.exists()) {
        return true;
      } else {
        insertUser(uid, currentUser);
        return false;
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      // Handle the error appropriately
      throw error;
    }
  };

  useEffect(() => {
    if (uid) {
      const checkUser = checkUserExists(uid);
      // console.log(checkUser);
      checkUser.then((result) => {
        if (result) {
          // console.log("getdata");
          getData();
        } else {
          // console.log("saveReference");
          saveReference(messages[0], messages[1]);
        }
      });
    }
    console.log(process.env.NODE_ENV);
  }, [uid]);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    console.log(process.env.NODE_ENV);
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
      setMessageLoading(true);
      const response = await fetch(`${apiUrl}api/completion`, {
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
        saveReference(human, ai);
      } catch (e) {
        // console.log(error);
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
          {messages.map((message, i) => (
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
