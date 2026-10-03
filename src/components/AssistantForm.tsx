"use client";
import { cn, randomPick } from "@/lib/utils";
import type { UIMessage, useChat } from "@ai-sdk/react";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MAX_CHARS = 300 as const;

const quickReplies = [
  "Available for hire?",
  "Do you freelance?",
  "What's your stack?",
  "Can I see your work?",
  "How much do you charge?",
  "How do I contact you?",
  "Do you do automation?",
  "Can you work remotely?",
  "How fast can you start?",
  "Do you take small projects?",
  "Got a GitHub?",
  "Favorite manga?",
];

export default function AssistantForm({
  chat,
}: {
  chat: ReturnType<typeof useChat>;
}) {
  const { messages, sendMessage, setMessages, status } = chat;
  const [replies] = useState(() => randomPick(quickReplies, 4));
  const [userInput, setUserInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const isDisabled = status === "streaming" || status === "submitted";
  const hasText = userInput.trim().length > 0 && userInput.length < MAX_CHARS;
  const isSendDisabled = !hasText || isDisabled;

  const submitText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_CHARS) return;
    if (isDisabled) return;

    sendMessage({ text: trimmed });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput) return;

    submitText(userInput);
    setUserInput("");
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8" />
          <div>
            <p className="text-sm font-semibold text-dark">Vesper Assistant</p>
            <p className="text-xs text-black/50 ">
              Answers about the coffee shop
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={messages.length === 0}
          aria-label="Clear chat"
          onClick={() => setMessages([])}
          className="p-2 rounded-full text-brown/80 hover:bg-dark/5 disabled:bg-transparent disabled:opacity-30 cursor-pointer disabled:cursor-default"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 chat-scroll">
        <div className="max-w-[80%] justify-start px-4 py-3 text-sm bg-dark/5 text-dark leading-relaxed rounded-2xl rounded-bl-xs">
          Hello, this is Vesper. Ask me about the coffee shop and the company.
        </div>

        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {status === "submitted" && <LoadingResponse />}

        {messages.length === 0 && (
          <div className="pt-3 grid grid-cols-2 gap-2">
            {replies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => submitText(reply)}
                className="rounded-full border border-black/10 px-2.5 py-1.5 text-left text-[0.7rem] text-dark hover:bg-black/5 cursor-pointer"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-black/10 px-4 py-3"
      >
        <input
          value={userInput}
          type="text"
          maxLength={MAX_CHARS}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask anything..."
          disabled={isDisabled}
          className="flex-1 bg-transparent text-sm text-dark outline-none placeholder:text-black/40"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={isSendDisabled}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full ",
            isSendDisabled
              ? "bg-dark/10 text-dark"
              : "bg-brown text-cream cursor-pointer"
          )}
        >
          <TopRightArrow />
        </button>
      </form>
    </>
  );
}

const LoadingResponse = () => (
  <div className="pt-3 flex justify-start">
    <div className="flex gap-1 rounded-2xl rounded-bl-xs bg-dark/5 px-4 py-3">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-dark/40" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-dark/40 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-dark/40 [animation-delay:300ms]" />
    </div>
  </div>
);

const TopRightArrow = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <title>Submit prompt</title>
    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatBubble = ({ message }: { message: UIMessage }) => {
  const isUser = message.role === "user";
  const isError = Boolean(
    (message.metadata as { isError?: boolean } | undefined)?.isError
  );

  return (
    <div
      className={cn(
        "flex flex-col pt-3 gap-y-2",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-br-xs bg-brown text-cream"
            : "rounded-bl-xs bg-dark/5 text-dark"
        )}
      >
        {message.parts.map((part, i) =>
          part.type === "text" ? (
            <span key={`${message.id}-${i}`}>{part.text}</span>
          ) : null
        )}
      </div>
      {isError && (
        <a
          href="mailto:hello@vesper.coffee"
          className="w-fit rounded-full bg-tan px-2 py-1 text-[0.7rem] font-semibold text-cream outline-none cursor-pointer"
        >
          <span className="font-light">@</span> Email us
        </a>
      )}
    </div>
  );
};
