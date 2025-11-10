"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ value }: { value: string }) => {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="transition-all duration-100 cursor-pointer text-foreground/90"
          onClick={() => handleCopy(value)}
        >
          {isCopied ? (
            <Check className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Copy className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="font-mono">
        {isCopied ? "Copied!" : "Copy"}
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyButton;
