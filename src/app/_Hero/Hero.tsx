import ViewProjectsBtn from "./ViewProjectsBtn";
import SectionFrame from "@/components/SectionFrame";

export default function Hero() {
  return (
    <SectionFrame id="hero" eyebrowRight={<span>Vol. 01 / 2026</span>}>
      <div className="flex flex-col gap-y-4 gap-x-10 sm:flex-row sm:justify-between sm:items-end">
        <div className="font-header leading-[0.85] text-[20vw] xl:text-[12vw]">
          <div className="text-foreground">ABBA</div>
          <div className="text-transparent name-outline">IS&apos;HAQ</div>
        </div>

        <div className="flex flex-col gap-5 sm:max-w-xs lg:max-w-sm">
          <p className="text-sm md:text-lg text-foreground/70 leading-relaxed py-2">
            I unravel mortal quandaries by means of mine own engine of
            computation.
          </p>

          <div className="flex flex-wrap gap-3">
            <ViewProjectsBtn />

            <a
              href="Abba_resume.pdf"
              download
              className="border border-foreground/30 px-5 py-3 text-xs font-bold uppercase tracking-widest text-center transition-colors hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
