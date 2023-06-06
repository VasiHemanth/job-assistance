"use client";
import React, { useEffect, useState, useRef } from "react";

import { openai } from "@/utils/openai/init";

import Prompt from "@/components/Prompt";
import Message from "@/components/Message";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "@/utils/firebase/init";

function UserStories() {
  // const [loading, setLoading] = useState(false);
  const markdown = `
Hi! I'm **Jarvis**, the coding assistant. I'm here to help you with any questions you have related to programming. Feel free to ask me anything and I'll do my best to answer it.

Here is an Example:

Create a python code to print all the elements in the list

~~~python
list = [1, 2, 3, 4, 5]

for number in list:
    print(number)
`;

  const Startprompt =
    "The following is a conversation with Jarvis. Jarvis is helpful and creative. Jarvis's only knowledge is Programming. He can only answer questions related to Programming. He only cares about Programming. Jarvis provides often code examples and description. Jarvis provides answers formated in markdown format.";

  const [messages, setMessages] = useState([
    {
      id: new Date().toISOString(),
      author: "human",
      avatar: "/profile.svg",
      text: "Hi there, Who are you?",
    },
    {
      id: new Date().toISOString(),
      author: "ai",
      avatar: "/onestepai-logo.png",
      text: markdown,
    },
  ]);

  // const chatRef = useRef(null);
  const { currentUser, userImage, uid } = useCurrentUser();

  // const query = collection(db, "user-stories");
  // const [docs, loading, error] = useCollectionData(query);

  // console.log("Check out the docs", query);
  // console.log("Docs", docs);

  // const saveUserData = async () => {
  //   await setDoc(doc(db, "user-stories", uid), {
  //     user: currentUser,
  //   });
  // };

  // saveUserData();

  // const saveQuestion = async (prompt) => {
  //   const docRef = await addDoc(collection(db, "story"), {
  //     userId: uid,
  //     author: currentUser,
  //     questionText: prompt,
  //   });

  //   const questionId = docRef.id;
  //   console.log("Document written with id:", questionId);
  //   return questionId;
  // };

  // const saveReference = async (resData, questionId) => {
  //   console.log("References", questionId);
  //   const queId = await questionId;
  //   console.log("Checking", queId);

  //   await addDoc(collection(db, "reference"), {
  //     userId: uid,
  //     questionId: queId,
  //     referenceText: resData,
  //   });
  // };

  const getData = async () => {
    const docRef = await getDoc(doc(db, "sample"));
    console.log("User Data", docRef);
  };

  useEffect(() => {
    console.log("User Stories useEffect");
  }, [messages]);

  async function handleSubmit(prompt) {
    if (prompt.trim().length === 0) {
      return;
    }

    getData();
    // const questionId = saveQuestion(prompt);

    setMessages((messages) => {
      return [
        ...messages,
        {
          id: new Date().toISOString(),
          author: currentUser,
          avatar: userImage,
          text: prompt,
        },
      ];
    });

    try {
      // setLoading(true);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: Startprompt + prompt,
        temperature: 0.7,
        max_tokens: 640,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      // console.log(response);
      let resData = response.data.choices[0].text.trim();
      // try {
      //   saveReference(resData, questionId);
      // } catch (e) {
      //   console.log(error);
      // }
      // console.log("ResData", resData);
      setMessages((messages) => {
        return [
          ...messages,
          {
            id: new Date().toISOString() + "0.001",
            author: "ai",
            avatar: "/onestepai-logo.png",
            text: resData,
          },
        ];
      });
    } catch (error) {
      console.log("handle submit error");
      console.error("Error", error);
    }
  }
  return (
    <div className="w-full h-screen">
      <div className="w-full h-5/6 overflow-auto scrollbar-hide">
        <div className="py-5 px-10">
          {messages.map((message, i) => (
            <Message
              key={message.id}
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
