import SectionFrame from "@/components/SectionFrame";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <SectionFrame id="contact" eyebrowRight={<span>05 — 05</span>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 h-full">
        <div className="flex flex-col md:justify-end pt-12 md:py-3">
          <h2 className="font-header leading-[0.95] text-foreground text-[9vw] sm:text-5xl md:text-6xl xl:text-7xl max-w-4xl">
            Let&apos;s build something useful
          </h2>
          <div className="py-2 flex flex-col gap-1">
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
              Have something in mind? Tell me about it.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </SectionFrame>
  );
}
