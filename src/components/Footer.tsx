import LinkIcons from "./icons/LinkIcons";

const links = [
  { label: "Discord", url: "https://discord.com/1535623839701008384" },
  { label: "GitHub", url: "https://github.com/absterr" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/absterr" },
  {
    label: "UpWork",
    url: "https://www.upwork.com/freelancers/~01c2edc701da4871c5?mp_source=share",
  },
  { label: "X", url: "https://x.com/_absterr" },
];

export default function Footer() {
  return (
    <footer className="font-mono bg-foreground text-background">
      <Ruler />
      <div className="mx-auto max-w-7xl px-8 md:px-10 xl:px-0">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 py-4 md:py-8">
          <div>
            <p className="uppercase font-header text-xl xl:text-2xl tracking-[0.02rem]">
              ABBA IS&apos;HAQ
            </p>
            <p className="tracking-tight text-[10px] md:text-xs">
              Automate the routine, build what matters
            </p>
          </div>

          <div className="w-full md:w-fit pt-2 md:pt-0 border-t border-background/20 md:border-0 order-1 md:order-0">
            <p className="text-[10px] md:text-xs uppercase">
              &copy; {new Date().getFullYear()} ABSTERR.IS-A.DEV - ALL RIGHTS
              RESERVED
            </p>
          </div>

          <div className="flex items-end gap-x-4 xl:gap-x-6">
            {links.map(({ label, url }) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={url}
                key={label}
                aria-label={label}
                className="p-1"
              >
                <LinkIcons
                  name={label.toLowerCase()}
                  className="h-5 w-5 md:h-7 md:w-7"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-6 md:pb-8" />
    </footer>
  );
}

const Ruler = () => (
  <div
    className="h-6 md:h-8 border-t border-background/20"
    style={{
      backgroundImage: `
        repeating-linear-gradient(
          to right,
          color-mix(in srgb, var(--background) 22%, transparent) 0,
          color-mix(in srgb, var(--background) 22%, transparent) 1px,
          transparent 1px,
          transparent 16px
        ),
        repeating-linear-gradient(
          to right,
          color-mix(in srgb, var(--background) 30%, transparent) 0,
          color-mix(in srgb, var(--background) 30%, transparent) 1px,
          transparent 1px,
          transparent 80px
        )
      `,
      backgroundSize: "16px 12px, 80px 100%",
      backgroundPosition: "0 0, 0 0",
      backgroundRepeat: "repeat-x",
    }}
  />
);
