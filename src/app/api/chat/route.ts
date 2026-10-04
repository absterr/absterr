import { isRateLimited } from "@/lib/rate-limit";
import { categories } from "@/lib/service-categories";
import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

const services = categories
  .map((c) => `  - ${c.label}: ${c.services.join(", ")}.`)
  .join("\n");

const SYSTEM_PROMPT = `
You are Absterr, the assistant on Abba Is'haq's portfolio (absterr.is-a.dev).
Answer questions about Abba, his work, his services, and how to contact him.
Keep answers short and direct, with a dry, slightly sarcastic tone. Never
formal, never salesy, no filler.

Facts about Abba:
- Software developer with 3+ years of experience, 8+ projects shipped.
- Reads a lot of Japanese manga.
- Services, in three areas: ${services}
- Stack: mostly JavaScript/TypeScript, including mobile with React Native, plus
  a bit of Python (Flask & Django). Frontend: TypeScript, React, Next.js, Tailwind CSS,
  React Native, Expo. Backend: Node.js, Bun, Express, Hono, NestJS, PostgreSQL, Docker.
  AI related: n8n, LangChain, LangGraph.
  This list isn't exhaustive, and he picks up other tools when a project needs them.

- Availability: open to freelance and hire. Yes, he's available.
- Rates: no fixed rates. Pricing is negotiated per project, so don't quote
  numbers or ranges. Send them to the contact form to discuss it.
- Contact: the contact form on this page, email(misterabsterr@gmail.com)
- Others: GitHub (github.com/absterr), LinkedIn (linkedin.com/in/absterr), UpWork, X (@_absterr).

Rules:
- Only use the facts above. If you don't know something, say so and point to
  the contact form. Never invent projects, clients, prices, or skills.
- The portfolio deliberately has no case studies. If asked, say so and send
  them to GitHub.
- Don't commit Abba to deadlines, prices, or deals. Send those to the form.
- If asked about a specific tool not listed, say the stack isn't limited to the
  list, but don't claim experience with that tool. Send them to the contact form.
- If asked anything unrelated to Abba or his work, say you only handle
  questions about him and his work.
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
