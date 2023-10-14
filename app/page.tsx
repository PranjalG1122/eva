"use client";

import MessageBox from "@/components/MessageBox";
import Navbar from "@/components/Navbar";
import { submitQuery } from "@/components/ServerActions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";

type MessageProps = {
  user: string;
  bot: string;
}[];

export default function Home() {
  const messageBoxRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isThinking, setIsThinking] = useState<boolean>(false);

  useEffect(() => {
    messageBoxRef.current!.focus();
  }, []);

  const [messages, setMessages] = useState<MessageProps>([]);

  const [userMessage, setUserMessage] = useState<string>("");
  const [videoURL, setVideoURL] = useState<string>("");

  const submitMessage = async (userMessage: string) => {
    setIsThinking(true);
    setMessages([
      ...messages,
      {
        user: userMessage,
        bot: "EVA is thinking...",
      },
    ]);
    messageBoxRef.current!.value = "";
    submitQuery(userMessage).then((res) => {
      console.log(res);
      setMessages([
        ...messages,
        {
          user: userMessage,
          bot: res.response,
        },
      ]);
      setVideoURL(res.videoURL);
      setIsThinking(false);
    });
  };

  return (
    <main className="flex flex-row items-start h-screen">
      <div className="flex flex-col bg-background-600 max-w-md h-full justify-center px-8 my-auto items-center gap-4">
        {(videoURL && (
          <video
            width="480"
            height="270"
            ref={videoRef}
            className="border-8 border-background-500 rounded"
            autoPlay
          >
            <source src={process.env.API2 + videoURL} />
          </video>
        )) || (
          <Image
            src="/avatar.png"
            alt="EVA"
            width={480}
            height={270}
            className="border-8 border-background-500 rounded"
          />
        )}

        <div className="flex flex-row items-center gap-1">
          <p className="font-semibold">EVA is speaking</p>
          <div className="flex flex-row items-end gap-2">
            <span className="flex w-1 h-1 rounded-full bg-background-400 animate-bounce" />
            <span className="flex w-1 h-1 rounded-full bg-background-400 animate-bounce" />
            <span className="flex w-1 h-1 rounded-full bg-background-400 animate-bounce" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full bg-background-400">
        <Navbar />
        {(messages.length > 0 && (
          <div className="flex flex-col items-center justify-end h-full gap-8 px-8 py-4 overflow-y-scroll">
            {messages.map((message, i) => {
              return (
                <MessageBox key={i} user={message.user} bot={message.bot} />
              );
            })}
          </div>
        )) || (
          <div className="flex flex-col items-start w-full text-black justify-end h-full gap-2 px-8 py-4 overflow-y-scroll">
            <p className="font-semibold">Ask EVA a question</p>
            <div className="flex flex-row items-center gap-2 w-full">
              <button
                className="w-full p-4 text-start border-2 border-background-600 rounded font-medium italic text-md hover:bg-background-500 transition-all"
                onClick={() => {
                  submitMessage("How many lakes are there in India?");
                }}
              >
                How many lakes are there in India?
              </button>
              <button
                className="w-full p-4 text-start border-2 border-background-600 rounded font-medium italic text-md hover:bg-background-500 transition-all"
                onClick={() => {
                  submitMessage("What is the longest river in India?");
                }}
              >
                What is the longest river in India?
              </button>
            </div>
            <div className="flex flex-row items-center gap-2 w-full">
              <button
                className="w-full p-4 text-start border-2 border-background-600 rounded font-medium italic text-md hover:bg-background-500 transition-all"
                onClick={() => {
                  submitMessage(
                    "Name the major river that flows through the Thar Desert"
                  );
                }}
              >
                Name the major river that flows through the Thar Desert
              </button>
              <button
                className="w-full p-4 text-start border-2 border-background-600 rounded font-medium italic text-md hover:bg-background-500 transition-all"
                onClick={() => {
                  submitMessage("What is the widest river in India?");
                }}
              >
                What is the widest river in India?
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-row items-center gap-4 px-8 py-4">
          <input
            placeholder="Write a message..."
            className="bg-background-500 px-4 py-2 rounded w-full text-black focus:outline-none"
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
            disabled={isThinking}
            ref={messageBoxRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitMessage(messageBoxRef.current!.value);
              }
            }}
          />
          <button
            className="bg-background-500 p-2 rounded hover:bg-background-600 transition-all"
            onClick={() => {
              submitMessage(messageBoxRef.current!.value);
            }}
            disabled={isThinking}
          >
            <Send color="black" />
          </button>
        </div>
      </div>
    </main>
  );
}
