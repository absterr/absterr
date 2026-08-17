import { NAV_ITEMS } from "@/lib/nav-items";
import { ReactNode } from "react";

type SectionFrameProps = {
  id: string;
  eyebrowRight?: ReactNode;
  children: ReactNode;
};

export default function SectionFrame({
  id,
  eyebrowRight,
  children,
}: SectionFrameProps) {
  const eyebrowLabel =
    id === "hero"
      ? "absterr.is-a.dev"
      : NAV_ITEMS.find((item) => item.id === id)?.label;

  const pageNumber =
    id === "hero"
      ? "P. 001"
      : `P. ${String(
          NAV_ITEMS.findIndex((item) => item.id === id) + 2
        ).padStart(3, "0")}`;

  return (
    <>
      {id !== "hero" && (
        <div className="py-12 md:py-16">
          <div className="border-t border-foreground/10" />
        </div>
      )}
      <section
        id={id}
        className="mx-auto min-h-screen max-w-7xl flex flex-col justify-between px-8 md:px-10 xl:px-0"
      >
        <div className="sticky top-(--nav-height) z-10 py-4 bg-background flex items-center justify-between text-[10px] md:text-xs text-accent font-mono uppercase tracking-widest">
          {eyebrowLabel ? <span>/ {eyebrowLabel}</span> : <span></span>}
          {eyebrowRight}
        </div>

        <div>
          <div className="flex-1">{children}</div>

          <div className="sticky bottom-0 z-10">
            <div className="pt-10 md:pt-14">
              <div className="flex flex-col gap-3 border-t border-foreground/10 bg-background py-4 md:py-6 font-mono">
                <div className="flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-widest">
                  <span className="text-foreground/60">{pageNumber}</span>
                  <div className="flex flex-col items-end gap-1 text-right">
                    <span className="text-foreground/80">
                      / AI Product Developer
                    </span>
                    {id === "hero" && (
                      <span className="text-accent">↓ Scroll to explore</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
