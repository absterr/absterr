"use client";
import { useChat } from "@ai-sdk/react";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import AssistantForm from "./AssistantForm";

export default function AssistantWidget() {
  const [isOpen, setOpen] = useState(false);
  const isMobile = useMediaQuery(768);

  const chat = useChat({
    onError: (err) => {
      chat.setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          parts: [{ type: "text", text: err.message }],
          metadata: { isError: true },
        },
      ]);
    },
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        className={`fixed bottom-18 right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14
          items-center justify-center rounded-full bg-foreground text-background shadow-lg`}
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </button>
      {isOpen ? (
        isMobile ? (
          <AssistantDrawer open={isOpen} onOpenChange={setOpen} chat={chat} />
        ) : (
          <div className="fixed bottom-36 right-8 z-50 flex h-130 w-90 flex-col rounded-2xl bg-cream shadow-lg">
            <AssistantForm chat={chat} />
          </div>
        )
      ) : null}
    </>
  );
}

const AssistantDrawer = ({
  open,
  onOpenChange,
  chat,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chat: ReturnType<typeof useChat>;
}) => (
  <Drawer.Root open={open} onOpenChange={onOpenChange}>
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-50 bg-dark/40" />
      <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex h-[75vh] flex-col rounded-t-2xl bg-beige">
        <div className="pb-2 pt-4">
          <div className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-black/40" />
        </div>
        <AssistantForm chat={chat} />
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
);

const useMediaQuery = (breakpoint: number) => {
  const query = `(max-width: ${breakpoint - 1}px)`;
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};
