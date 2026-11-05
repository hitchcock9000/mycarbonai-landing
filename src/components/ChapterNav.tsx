import { CHAPTERS } from "../data/content";
import { cn } from "../utils/cn";

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
  const light = theme === "light";
  const color = light ? "text-ink" : "text-white";
  const muted = light ? "bg-ink/20" : "bg-white/35";
  const activeDot = "bg-cyan";

  return (
    <div className={cn("flex items-center gap-5", color)}>
      <button
        type="button"
        onClick={onPrev}
        disabled={active <= 0}
        className="grid h-9 w-9 place-items-center rounded-full disabled:opacity-30"
        aria-label="Capítulo anterior"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex items-center gap-2" role="tablist" aria-label="Capítulos">
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={ch.label}
            onClick={() => onDot(i)}
            className={cn("h-2 w-2 rounded-full transition-all", i === active ? `${activeDot} w-2.5 h-2.5` : muted)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={active >= CHAPTERS.length - 1}
        className="grid h-9 w-9 place-items-center rounded-full disabled:opacity-30"
        aria-label="Capítulo seguinte"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {showHint && (
        <p className={cn("scroll-hint ml-2 hidden items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] md:flex", light ? "text-ink/70" : "text-white/70")}>
          <span className="inline-block h-px w-8 bg-current" />
          Deslize para explorar
          <span className="inline-block h-px w-8 bg-current" />
        </p>
      )}
    </div>
  );
}
