import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "This is the portfolio of Abba Is'haq",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="dot-grid-bg" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: `font-mono antialiased text-xs md:text-sm bg-foreground
              text-background border border-background/50 shadow-xl rounded-none
              flex items-center gap-2 w-full p-4 rounded-lg tracking-wide`,
              title: "font-semibold",
              success: "bg-background! text-foreground!",
              error: "text-accent! border-accent/50!",
            },
          }}
        />
      </body>
    </html>
  );
}
