import SectionFrame from "@/components/SectionFrame";

export default function About() {
  return (
    <SectionFrame id="about" eyebrowRight={<span>02 — 05</span>}>
      <div className="flex flex-col gap-8 pt-10 md:pt-14">
        <h2 className="font-header leading-[0.95] text-foreground text-[9vw] sm:text-5xl md:text-6xl xl:text-7xl max-w-4xl">
          I build software with reason
        </h2>
        <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
          I&apos;m a software developer who likes building things, breaking them
          apart, and figuring out better ways to put them back together.
          I&apos;m particularly interested in the parts of software that quietly
          handle the work in the background. If it solves a real problem, saves
          someone time, or makes something possible that wasn’t before, I
          consider it worth building. I also love japanese manga.
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
                Years building
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-header text-foreground text-3xl md:text-5xl">
                10+
              </span>
              <span className="text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest">
                Projects shipped
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-header text-foreground text-3xl md:text-5xl">
                08
              </span>
              <span className="text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest">
                Core technologies
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
