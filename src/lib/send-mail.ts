"use server";
import { ContactFormValues } from "@/app/_Contact/contact-schema";
import { categories } from "@/lib/service-categories";
import { promises as dns } from "dns";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { buildEmailHTML } from "./email-template";
import { isRateLimited } from "./rate-limit";

const hasMxRecords = async (email: string) => {
  const domain = email.split("@")[1];
  if (!domain) return false;

  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
};

const sendMail = async (userMessage: ContactFormValues) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }

  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      message: "You have exceeded the rate limit. Please try again later.",
    };
  }

  const isValidEmail = await hasMxRecords(userMessage.email);

  if (!isValidEmail)
    return {
      success: false,
      message: "The email address doesn't appear to be reachable.",
    };

  const categoryLabels = userMessage.selection.categoryIds
    .map((id) => categories.find((category) => category.id === id)?.label)
    .filter((label): label is string => Boolean(label));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Portfolio website: <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: userMessage.email,
      subject: `New Contact – ${userMessage.name}`,
      html: buildEmailHTML(userMessage, categoryLabels),
    });

    return { success: true, message: "Message sent successfully." };
  } catch {
    return {
      success: false,
      message: "Unable to send message. Please try again.",
    };
  }
};

export default sendMail;
