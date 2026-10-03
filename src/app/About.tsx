import SectionFrame from "@/components/SectionFrame";

export default function About() {
  return (
    <SectionFrame id="about" eyebrowRight={<span>02 — 05</span>}>
      <div className="flex flex-col gap-8 pt-10 md:pt-14">
        <h2 className="font-header leading-[0.95] text-foreground text-[9vw] sm:text-5xl md:text-6xl xl:text-7xl max-w-4xl">
          I build software with reason, usually
        </h2>
        <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
          I&apos;m a developer. I build things. I break things. I also put
          broken things back together, often better than it was before it broke.
          I&apos;m particularly into parts of software that quietly handle the
          work in the background. If it solves a real problem or saves someone
          time, it&apos;s worth building. I also read a lot of Japanese manga,
          which has nothing to do with any of this, but it&apos;s my site.
        </p>
      </div>
      <div className="pt-12 md:pt-16">
        <div className="flex flex-col gap-3 border-t border-foreground/10 pt-8 md:pt-12">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-header text-foreground text-3xl md:text-5xl">
                03+
              </span>
              <span className="text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest">
                Years of doing this
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-header text-foreground text-3xl md:text-5xl">
                08+
              </span>
              <span className="text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest">
                Projects shipped
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-header text-foreground text-3xl md:text-5xl">
                10+
              </span>
              <span className="text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest">
                Tools I&apos;ve tried
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
