import Image from "next/image";

export default function Projects() {
  return (
    <section
      className="font-mono max-w-7xl mx-auto text-center py-32 lg:py-46 px-4 md:px-8"
      id="projects"
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-wide mb-3">
        PROJECTS
      </h2>
      <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto mb-6 md:mb-8"></div>
      <p className="text-foreground/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto px-2">
        Ah, my proof of work
      </p>

      <div className="py-8">
        <Image
          className="mx-auto"
          src={"/cat-furiously-typing-gif.gif"}
          alt="cat furiously typing"
          width={738}
          height={738}
        />
      </div>

      <p className="text-foreground/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto px-2">
        Well, I deleted them from here, and I&apos;m working on new ones. Stay
        tuned!
      </p>
    </section>
  );
}
