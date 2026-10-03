import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className={`mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col font-mono
      items-center justify-center gap-6 px-4 py-20 font-body text-center md:py-32`}
    >
      <span className="text-[10px] uppercase tracking-widest text-muted md:text-xs text-foreground/70">
        404 / Page Not Found
      </span>

      <div className="flex flex-col items-center gap-3">
        <h1 className="font-header leading-[0.95] text-5xl uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Well, This Is Awkward
        </h1>

        <p className="max-w-md uppercase leading-relaxed tracking-wide text-muted text-xs md:text-sm">
          Whatever you&apos;re looking for isn&apos;t here.
        </p>
      </div>

      <Link
        href="/"
        className={`bg-foreground text-background px-5 py-3 text-xs text-center
          font-bold uppercase tracking-widest cursor-pointer transition-colors hover:bg-accent`}
      >
        Let's go back
      </Link>
    </section>
  );
}
