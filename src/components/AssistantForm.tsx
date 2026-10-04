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
  "Take small projects?",
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
      <div
        className={`flex items-center justify-between font-mono border-b
          border-background/10 px-4 py-3 text-background`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`h-8 w-8 bg-background text-foreground flex flex-col
              items-center justify-center rounded-full text-xs`}
          >
            AI
          </div>
          <div>
            <p className="text-sm font-semibold">Absterr&apos;s Assistant</p>
            <p className="text-[11px] text-background/70">
              Answers about Abba and his work
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={messages.length === 0}
          aria-label="Clear chat"
          onClick={() => setMessages([])}
          className={`p-2 rounded-full text-background/80 hover:bg-background/5
           transition-colors duration-100 cursor-pointer disabled:bg-transparent
           disabled:opacity-30 disabled:cursor-default`}
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 chat-scroll text-background">
        <div
          className={`justify-start max-w-[80%] rounded-lg px-4 py-3 text-xs font-mono
            leading-relaxed rounded-bl-none bg-background/50 text-foreground`}
        >
          Hi, I'm Abba's assistant. You can ask me about his work, his stack, or
          whether he's free to take on your project.
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
                className={`rounded-full border border-background/10 px-2.5 py-1.5
                  font-mono whitespace-nowrap text-left text-[9px] font-semibold
                  tracking-wide text-background/70 hover:bg-background/5 cursor-pointer`}
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
        className="flex items-center gap-2 border-t border-background/10 text-background px-4 py-3"
      >
        <input
          value={userInput}
          type="text"
          maxLength={MAX_CHARS}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask anything..."
          disabled={isDisabled}
          className="flex-1 bg-transparent text-xs font-mono outline-none placeholder:text-background/50"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={isSendDisabled}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            isSendDisabled
              ? "bg-background/20 text-foreground"
              : "bg-background text-foreground cursor-pointer"
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
    <div className="flex gap-1 rounded-2xl rounded-bl-xs bg-background/10 px-4 py-3">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-background/50" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-background/50 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-background/50 [animation-delay:300ms]" />
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
          "max-w-[80%] rounded-lg px-4 py-3 text-xs font-mono leading-relaxed",
          isUser
            ? "rounded-br-none bg-background text-foreground"
            : "rounded-bl-none bg-background/50 text-foreground"
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
          href="mailto:misterabsterr@gmail.com"
          className={`w-fit rounded-lg bg-background/85 px-2.5 py-1.5 text-[10px]
            font-mono font-semibold text-foreground tracking-wide outline-none cursor-pointer`}
        >
          <span className="font-light">@</span> Email me
        </a>
      )}
    </div>
  );
};
