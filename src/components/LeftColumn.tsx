import { IconArrow, IconPlay } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";

type LeftColumnProps = {
  onHow: () => void;
  compact?: boolean;
};

export function LeftColumn({ onHow, compact = false }: LeftColumnProps) {
  const { t } = useLanguage();
  return (
    <div
      className={`relative z-10 flex h-full flex-col justify-center ${
        compact ? "min-h-[100svh] px-5 pb-10 pt-28" : "px-5 pb-14 pt-24 sm:px-8 lg:px-10 xl:px-14"
      }`}
    >
      <p className="eyebrow mb-4 text-white/75">{t.hero.eyebrow}</p>

      <h1
        className={`font-display text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.35)] ${
          compact
            ? "text-[clamp(2.15rem,5vw,4rem)] leading-[1.04]"
            : "text-[clamp(2.25rem,3vw,3.15rem)] leading-[1.04]"
        }`}
      >
        <span className="block">{t.hero.lead}</span>
        <span className="block text-cyan">{t.hero.accent}</span>
        <span className="block">{t.hero.tail}</span>
      </h1>

      <p
        className={`mt-5 max-w-[34rem] text-white/82 ${
          compact ? "text-[0.98rem] leading-relaxed" : "text-[1rem] leading-[1.5] xl:text-[1.05rem]"
        }`}
      >
        {t.hero.body}
      </p>

      <div className="mt-6 flex max-w-full flex-wrap items-center gap-x-5 gap-y-3 overflow-hidden">
        <a href="/piloto" className="btn-primary max-w-full">
          {t.ctaPilot}
          <IconArrow />
        </a>
        <button type="button" className="btn-ghost" onClick={onHow}>
          <span className="play text-white">
            <IconPlay />
          </span>
          <span className="label">{t.ctaHow}</span>
        </button>
      </div>
    </div>
  );
}
