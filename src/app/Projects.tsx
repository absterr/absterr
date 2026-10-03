import SectionFrame from "@/components/SectionFrame";
import Image from "next/image";

export default function Projects() {
  return (
    <SectionFrame id="projects" eyebrowRight={<span>04 — 05</span>}>
      <div className="flex flex-col gap-8 pt-10 md:pt-14">
        <h2 className="font-header leading-[0.95] text-foreground text-[9vw] sm:text-5xl md:text-6xl xl:text-7xl max-w-4xl">
          Some Projects...
        </h2>
        <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
          Because saying that I write code for a living on a fancy website
          isn&apos;t enough for you.
        </p>
        <div className="flex flex-col gap-10">
          <Image
            src={"cat-furiously-typing.gif"}
            alt="Cat furiously typing on a keyboard"
            width={1366}
            height={768}
            unoptimized
            className="w-full max-w-4xl h-auto"
          />

          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
              There's really nothing to see here. Literally.
            </p>
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
              No fake case studies, no filler side projects, just this cat. Side
              projects aren&apos;t gonna convince you of anything anyways, are
              they?
            </p>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
