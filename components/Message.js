import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Message({ text: initialText, avatar, idx, author }) {
  const [text, setText] = useState(author === "ai" ? "" : initialText);
  const bgColorClass = idx % 2 === 0 ? "bg-black-shade" : "bg-black-input";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(initialText.slice(0, text.length + 1));
    }, 2);

    return () => clearTimeout(timeout);
  }, [initialText, text]);

  const blinkingCursorClass =
    initialText.length === text.length ? "" : "blinking-cursor";

  return (
    <div className={`flex flex-row  p-4 border-black text-sm`}>
      <div className="w-[30px] relative mr-4">
        <Image src={avatar} width={30} height={30} alt="" />
      </div>
      <div
        className={`w-full ${bgColorClass} px-4 py-2 rounded-r-lg rounded-b-lg`}
      >
        <ReactMarkdown
          // className={blinkingCursorClass}
          components={{
            code({ inline, className, children, style, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {children}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
