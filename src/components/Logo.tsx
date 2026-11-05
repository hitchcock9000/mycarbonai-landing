import { cn } from "../utils/cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showTagline?: boolean;
  taglineClassName?: string;
};

export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  showTagline = false,
  taglineClassName,
}: LogoProps) {
  return (
    <a href="#topo" className={cn("inline-flex items-center gap-2.5 no-underline", className)} aria-label="MyCarbonAI — início">
      <span className={cn("inline-flex text-cyan", markClassName)} aria-hidden>
        <LogoMark />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] tracking-tight text-white",
            wordmarkClassName,
          )}
        >
          MyCarbonAI
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/70",
              taglineClassName,
            )}
          >
            From invisible to visible.
          </span>
        )}
      </span>
    </a>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 42 48"
      className={cn("h-9 w-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M21.2 3.2C13.4 6.6 6.6 16.2 8.2 28.4c1.15 8.2 7.1 13.4 13 13.4 9.1 0 15.4-9.2 15.4-20.2C36.6 10.6 29.6 4.4 21.2 3.2Z"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinejoin="round"
      />
      <path
        d="M14.2 37.4c-1.6-1.2-2.5-2.6-3.1-4.4"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <path
        d="M21 35.2V15.6M21 22.2h-7.4M21 22.2h7.8M13.6 22.2v-5.6M28.8 22.2v5.8M21 15.6h6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="13.6" cy="16.6" r="1.55" fill="currentColor" />
      <circle cx="28.8" cy="28" r="1.55" fill="currentColor" />
      <circle cx="27.2" cy="15.6" r="1.55" fill="currentColor" />
      <circle cx="21" cy="35.2" r="1.35" fill="currentColor" />
    </svg>
  );
}
