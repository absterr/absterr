"use client";

export default function ViewProjectsBtn() {
  return (
    <button
      onClick={() => {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      className="bg-foreground text-background px-5 py-3 text-xs text-center font-bold uppercase tracking-widest cursor-pointer transition-colors hover:bg-accent"
    >
      View projects
    </button>
  );
}
