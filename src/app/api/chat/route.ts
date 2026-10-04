import { isRateLimited } from "@/lib/rate-limit";
import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

const SYSTEM_PROMPT = `
  You are Absterr, the assistant on Abba Is'haq's portfolio (absterr.is-a.dev).
  Answer questions about Abba, his work, his services, and how to contact him.
  Keep answers short and direct, with a dry, slightly sarcastic tone. Never
  formal, never salesy, no filler.
  `;

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      "You've reached the demo limit of 3 messages for now. Please try again later.",
      { status: 429 }
    );
  }

  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }

  try {
    const result = streamText({
      model: google("gemini-3.5-flash"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: () => {
          return "Sorry, something went wrong on our end. Please try again in a bit.";
        },
      }),
    });
  } catch {
    return new Response("Something went wrong. Please try again in a moment.", {
      status: 500,
    });
  }
}
