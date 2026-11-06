import { CHAPTERS } from "../data/content";
import { cn } from "../utils/cn";
import { useLanguage } from "../i18n/LanguageProvider";

type ChapterNavProps = {
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (index: number) => void;
  theme?: "light" | "dark";
  showHint?: boolean;
};

export function ChapterNav({
  active,
  onPrev,
  onNext,
  onDot,
  theme = "light",
  showHint = false,
}: ChapterNavProps) {
  const { t } = useLanguage();
  const light = theme === "light";
  const color = light ? "text-ink" : "text-white";
  const muted = light ? "bg-ink/25" : "bg-white/45";
  const activeDot = "bg-cyan";
  const hover = light ? "hover:bg-ink/5" : "hover:bg-white/10";

  return (
    <div className={cn("flex items-center justify-center gap-1.5 sm:gap-2", color)}>
      <button
        type="button"
        onClick={onPrev}
        disabled={active <= 0}
        className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors", hover, "disabled:cursor-not-allowed disabled:opacity-35")}
        aria-label={t.common.prevChapter}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex shrink-0 items-center" role="group" aria-label={t.common.jumpToChapter}>
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            type="button"
            aria-pressed={i === active}
            aria-label={`${t.common.jumpToChapter} ${i + 1}: ${t.chapters[i]}`}
            onClick={() => onDot(i)}
            className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors", hover)}
          >
            <span
              aria-hidden="true"
              className={cn("block h-2.5 w-2.5 rounded-full transition-all", i === active ? `${activeDot} h-3 w-3` : muted)}
            />
          </button>
        ))}
      </div>

      <span className="min-w-[3.1rem] text-center font-mono text-[0.64rem] font-semibold tabular-nums tracking-[0.12em]" aria-hidden="true">
        {String(active + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={active >= CHAPTERS.length - 1}
        className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors", hover, "disabled:cursor-not-allowed disabled:opacity-35")}
        aria-label={t.common.nextChapter}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {showHint && (
        <p className={cn("scroll-hint ml-1 hidden items-center gap-2 whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.14em] md:flex", light ? "text-ink/70" : "text-white/75")}>
          <span className="inline-block h-px w-5 bg-current" aria-hidden="true" />
          {t.common.scrollHint} <span aria-hidden="true">↓</span>
        </p>
      )}
    </div>
  );
}
