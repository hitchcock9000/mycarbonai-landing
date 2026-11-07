import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { IconArrow, IconFile, IconLink } from "./Icons";

export function PilotSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const reveal = entered && !reducedMotion ? "pilot-reveal" : "";

  return (
    <section ref={sectionRef} id="piloto-valida" className="scroll-mt-24 bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className={`grid items-center gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:gap-14 ${reveal}`}>
          <div>
            <p className="kicker flex items-center gap-3 text-ink/65">
              <span className="inline-block h-0.5 w-8 shrink-0 bg-cyan-deep" />
              {t.pilot.kicker}
            </p>
            <h2 id="produto" className="mt-5 max-w-xl scroll-mt-24 font-display text-4xl leading-[1.08] text-ink lg:text-[3.2rem]">
              {t.pilot.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
              {t.pilot.body}
            </p>
          </div>

          <PilotFlow entered={entered && !reducedMotion} />
        </div>

        <div className={`mt-12 rounded-2xl bg-[#e9eee8] px-5 py-5 md:px-8 ${reveal}`}>
          <dl className="grid gap-4 md:grid-cols-3 md:gap-0">
            {t.pilot.scope.map((item, index) => (
              <div key={item} className={`flex min-h-12 items-center md:px-6 ${index > 0 ? "md:border-l md:border-ink/15" : "md:pl-0"}`}>
                <dt className="font-display text-xl leading-tight text-ink md:text-2xl">{item}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-4 border-t border-ink/10 pt-3 text-sm leading-relaxed text-ink/70">
            {t.pilot.scopeNote}
          </p>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
          {t.pilot.cards.map((item, index) => (
            <li
              key={item.title}
              style={entered && !reducedMotion ? { animationDelay: `${index * 100}ms` } : undefined}
              className={`pilot-point md:px-7 ${index > 0 ? "md:border-l md:border-ink/15" : "md:pl-0"} ${reveal}`}
            >
              <p className="flex items-center gap-3 font-mono text-sm font-bold tracking-wide text-ink/80">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="h-0.5 w-8 bg-cyan-deep" aria-hidden="true" />
              </p>
              <h3 className="mt-3 font-display text-xl leading-snug text-ink">{item.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/70 md:text-base">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className={`mt-12 rounded-2xl bg-navy px-6 py-7 text-white md:px-9 lg:mt-16 ${reveal}`}>
          <p className="kicker text-cyan">{t.pilot.resultLabel}</p>
          <p className="mt-3 max-w-5xl font-display text-xl leading-snug md:text-2xl">{t.pilot.result}</p>
          <p className="mt-4 max-w-5xl text-sm leading-relaxed text-white/75 md:text-base">{t.pilot.caveat}</p>
        </div>
      </div>
    </section>
  );
}

function PilotFlow({ entered }: { entered: boolean }) {
  const { t } = useLanguage();
  return (
    <figure className={`pilot-flow rounded-2xl border border-ink/10 bg-white/55 p-4 md:p-6 ${entered ? "pilot-flow-enter" : ""}`}>
      <figcaption className="mb-5 inline-flex rounded-full bg-cyan/20 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-ink md:text-xs">
        {t.pilot.flowLabel}
      </figcaption>

      <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[minmax(7.5rem,0.8fr)_2.75rem_minmax(11rem,1.35fr)_2.75rem_minmax(7.5rem,0.8fr)] sm:gap-3">
        <ul className="flex flex-col justify-center gap-2.5" aria-label={t.pilot.sources.join(", ")}>
          {t.pilot.sources.map((source) => (
            <li key={source} className="flex min-h-12 items-center gap-2.5 rounded-xl border border-ink/10 bg-white px-3 py-2.5 text-sm font-bold text-ink shadow-sm">
              <IconFile className="h-4 w-4 shrink-0 text-cyan-deep" />
              <span>{source}</span>
            </li>
          ))}
        </ul>

        <FlowConnector className="hidden sm:block" />
        <div className="pilot-flow-arrow flex h-6 flex-col items-center justify-center sm:hidden" aria-hidden="true">
          <span className="h-3 w-0.5 bg-cyan-deep" />
          <IconArrow className="h-3 w-3 rotate-90 text-cyan-deep" />
        </div>

        <div className="rounded-xl border border-ink/20 bg-white shadow-sm">
          <h3 className="rounded-t-xl border-b border-cyan-deep/25 bg-cyan/20 px-3 py-3 text-sm font-extrabold leading-snug text-ink md:text-base">
            {t.pilot.recordTitle}
          </h3>
          <div className="divide-y divide-ink/10 px-3 text-xs font-semibold text-ink/75 md:text-sm">
            <p className="flex items-center gap-2 py-3"><IconLink className="h-4 w-4 shrink-0 text-cyan-deep" />{t.pilot.recordSource}</p>
            <p className="flex items-start gap-2 py-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full border border-cyan-deep" />{t.pilot.recordReview}</p>
          </div>
        </div>

        <div className="pilot-flow-arrow flex items-center justify-center py-1 sm:py-0">
          <IconArrow className="hidden h-5 w-5 text-cyan-deep sm:block" />
          <span className="h-5 w-0.5 bg-cyan-deep sm:hidden" />
        </div>

        <div className="flex min-h-14 items-center justify-center gap-2.5 rounded-xl border border-ink/15 bg-[#e9eee8] px-3 py-3 text-center text-sm font-bold leading-snug text-ink">
          <PersonOutline />
          <span>{t.pilot.reviewTitle}</span>
        </div>
      </div>
    </figure>
  );
}

function FlowConnector({ className = "" }: { className?: string }) {
  return (
    <svg className={`pilot-flow-connector h-6 w-full self-center ${className}`} viewBox="0 0 40 24" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" d="M2 12 H34" />
      <path pathLength="1" d="M28 6 L34 12 L28 18" />
    </svg>
  );
}

function PersonOutline() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-ink" fill="none" aria-hidden="true">
      <circle cx="12" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 20c.5-4 3.2-6 7.5-6s7 2 7.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
