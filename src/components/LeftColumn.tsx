import { COPY } from "../data/content";
import { IconArrow, IconPlay } from "./Icons";

type LeftColumnProps = {
  onHow: () => void;
  compact?: boolean;
};

export function LeftColumn({ onHow, compact = false }: LeftColumnProps) {
  return (
    <div
      className={`relative z-10 flex h-full flex-col justify-center ${
        compact ? "px-5 py-10" : "px-6 pb-16 pt-24 md:px-10 lg:px-12 xl:px-14"
      }`}
    >
      <p className="eyebrow mb-6 text-white/75">{COPY.eyebrow}</p>

      <h1
        className={`font-display text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.35)] ${
          compact
            ? "text-[2.15rem] leading-[1.08]"
            : "text-[2.35rem] leading-[1.05] sm:text-[2.8rem] lg:text-[3.45rem] xl:text-[4.15rem]"
        }`}
      >
        {COPY.titleLead}{" "}
        <span className="text-cyan">{COPY.titleAccent}</span> {COPY.titleTail}
      </h1>

      <p
        className={`mt-6 max-w-[34rem] text-white/82 ${
          compact ? "text-[0.98rem] leading-relaxed" : "text-[1.02rem] leading-[1.55] lg:text-[1.08rem]"
        }`}
      >
        {COPY.body}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <a href="#piloto" className="btn-primary">
          {COPY.ctaPilot}
          <IconArrow />
        </a>
        <button type="button" className="btn-ghost" onClick={onHow}>
          <span className="play text-white">
            <IconPlay />
          </span>
          <span className="label">{COPY.ctaHow}</span>
        </button>
      </div>
    </div>
  );
}
