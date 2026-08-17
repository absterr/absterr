"use client";
import { cn } from "@/lib/utils";
import { Mail, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav-items";

const handleNavClick = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id.toLowerCase())
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    const handleScrollTop = () => {
      if (window.scrollY < window.innerHeight * 0.2) {
        setActive("home");
      }
    };

    window.addEventListener("scroll", handleScrollTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/20 backdrop-blur-sm font-mono">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-8 md:px-10 xl:px-0 py-4">
        <button
          onClick={() => handleNavClick("hero")}
          className="text-xs font-medium tracking-wide text-left uppercase cursor-pointer"
        >
          ABBA IS&apos;HAQ
        </button>

        <nav className="hidden md:flex items-center justify-center gap-x-4 lg:gap-x-6 uppercase tracking-wide">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              role="button"
              onClick={() => handleNavClick(id.toLowerCase())}
              className={cn(
                "transition-colors cursor-pointer uppercase text-[10px] lg:text-[11px] shrink-0",
                id.toLowerCase() === active
                  ? "text-accent"
                  : "text-foreground/80 hover:text-text-accent"
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex justify-end">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:misterabsterr@gmail.com"
            className="group border border-foreground/30 px-4 py-2 flex items-center gap-2 transition-colors duration-150 hover:border-accent"
          >
            <Mail className="text-foreground h-4 w-4 inline group-hover:text-accent transition-colors duration-150" />
            <span className="text-xs font-bold uppercase tracking-widest group-hover:text-accent text-center transition-colors duration-150">
              Email Me
            </span>
          </a>
        </div>

        <button
          role="button"
          onClick={() => setOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden flex flex-col justify-center gap-1.5 p-1.5 border border-foreground/50"
        >
          <Menu />
        </button>
      </div>

      <nav
        className={cn(
          "md:hidden bg-background/20 px-8 backdrop-blur-sm transition-[height, transform] duration-200 ease-in-out",
          isOpen ? "h-50 sm:h-54" : "h-0"
        )}
      >
        <div
          className={cn(
            "py-4 flex flex-col gap-3 sm:gap-4",
            isOpen
              ? "opacity-100 delay-150"
              : "opacity-0 delay-0 pointer-events-none"
          )}
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              role="button"
              onClick={() => {
                handleNavClick(id.toLowerCase());
                setOpen(false);
              }}
              className={cn(
                "py-2 text-xs text-left font-medium uppercase tracking-wide",
                id.toLowerCase() === active
                  ? "text-accent"
                  : "text-foreground/80"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
