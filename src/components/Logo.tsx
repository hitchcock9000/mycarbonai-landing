import { cn } from "../utils/cn";
import { useLanguage } from "../i18n/LanguageProvider";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showTagline?: boolean;
  taglineClassName?: string;
  tagline?: string;
  href?: string;
};

export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  showTagline = false,
  taglineClassName,
  tagline,
  href = "#topo",
}: LogoProps) {
  const { t } = useLanguage();
  return (
    <a href={href} className={cn("inline-flex items-center gap-2.5 no-underline", className)} aria-label={t.brandAria}>
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
            {tagline ?? "From invisible to visible."}
          </span>
        )}
      </span>
    </a>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return <img src="/brand/mycarbonai-mark.svg" className={cn("h-9 w-8 object-contain", className)} alt="" aria-hidden="true" />;
}
