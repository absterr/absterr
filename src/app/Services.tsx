import SectionFrame from "@/components/SectionFrame";
import { cn } from "@/lib/utils";
import { categories, type ServiceCategory } from "@/lib/service-categories";

type ServiceCardProps = {
  icon: React.ReactNode;
  tag: string;
  category: ServiceCategory;
};

export default function Services() {
  return (
    <SectionFrame id="services" eyebrowRight={<span>03 — 05</span>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 h-full">
        <div className="flex flex-col md:justify-end pt-24 md:py-3">
          <h2 className="font-header leading-[0.95] text-foreground text-[9vw] sm:text-5xl md:text-6xl xl:text-7xl max-w-4xl">
            What I can build for you
          </h2>
          <p className="py-2 text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
            Three areas, one engine behind them all.
          </p>

          <div className="hidden md:block pt-0 md:pt-8">
            <div className="flex flex-col max-w-md">
              <span className="text-[10px] uppercase tracking-widest underline underline-offset-4 text-foreground">
                Skills &amp; Services
              </span>

              <ul className="pt-5 flex flex-col">
                {categories.map((category, idx) => (
                  <li
                    key={category.id}
                    className="flex items-center gap-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground/50"
                  >
                    <span className="w-5 text-foreground/30">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <span>{category.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 px-2 py-3 overflow-x-auto overflow-y-hidden scrollbar-none">
          {categories.map((category, idx) => {
            const tag = `${idx + 1} / ${categories.length}`;
            return (
              <ServiceCard
                key={category.id}
                tag={tag}
                icon={
                  <div className="h-3 w-3 rounded-full border border-foreground/40" />
                }
                category={category}
              />
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}

const ServiceCard = ({
  icon,
  tag,
  category: { label, services },
}: ServiceCardProps) => (
  <div
    className={cn(
      "relative shrink-0 w-full md:w-70 min-h-110 sm:min-h-0 md:min-h-115",
      "flex flex-col justify-between gap-8 p-6",
      "border-[1.5px] border-foreground/10 bg-background shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]",
      "hover:translate-z-2 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-150"
    )}
  >
    <span className="pointer-events-none absolute -left-1.5 -top-1.5 h-2.5 w-2.5">
      <span className="absolute left-1/2 top-0 h-full w-px bg-foreground/15" />
      <span className="absolute top-1/2 left-0 h-px w-full bg-foreground/15" />
    </span>
    <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-2.5 w-2.5">
      <span className="absolute left-1/2 top-0 h-full w-px bg-foreground/15" />
      <span className="absolute top-1/2 left-0 h-px w-full bg-foreground/15" />
    </span>

    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center border border-foreground/20 text-foreground/50">
          {icon}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-foreground/50">
          {tag}
        </span>
      </div>

      <h3 className="text-left font-header text-2xl text-foreground">
        {label}
      </h3>
    </div>

    <div className="border-t border-foreground/10 pt-6">
      <ul className="flex flex-col gap-4 text-left tracking-wide text-foreground/70">
        {services.map((service) => (
          <li key={service} className="flex items-start gap-3 md:gap-4">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span className="text-[11px] md:text-xs">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
