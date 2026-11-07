import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { DocumentFlow } from "./DocumentFlow";
import { IconArrow, IconBolt, IconChart, IconCheck, IconDrop, IconFile, IconLeaf, IconRecycle } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";
import { useReducedMotion } from "../hooks/useReducedMotion";

const STEP_ICONS = [IconFile, IconChart, IconLeaf, IconBolt, IconCheck];

export function HowItWorks() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const step = t.how.steps[activeStep];
  const activeIcon = STEP_ICONS[activeStep];

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

  const reveal = entered && !reducedMotion ? "how-section-reveal" : "";

  const selectAndFocus = (index: number) => {
    const next = Math.max(0, Math.min(t.how.steps.length - 1, index));
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectAndFocus(index === t.how.steps.length - 1 ? 0 : index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectAndFocus(index === 0 ? t.how.steps.length - 1 : index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectAndFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectAndFocus(t.how.steps.length - 1);
    }
  };

  const changeStep = (amount: number) => {
    setActiveStep((current) => Math.max(0, Math.min(t.how.steps.length - 1, current + amount)));
  };

  return (
    <section ref={sectionRef} id="como-funciona" className="relative scroll-mt-24 overflow-hidden bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-10">
        <header className={`max-w-3xl ${reveal}`}>
          <p className="kicker flex items-center gap-3 text-ink/60">
            <span className="inline-block h-0.5 w-8 bg-cyan" />
            {t.how.kicker}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-ink lg:text-[3.2rem]">
            {t.how.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            {t.how.body}
          </p>
        </header>

        <div id="how-step-panel" role="tabpanel" aria-labelledby={`how-step-tab-${activeStep}`} className={`mt-12 grid min-h-[28rem] items-center gap-8 rounded-[1.75rem] border border-ink/8 bg-white/75 p-5 shadow-[0_18px_70px_rgba(4,20,35,0.07)] md:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:p-10 ${reveal}`}>
          <div key={`copy-${activeStep}`} className={reducedMotion ? "" : "how-step-enter"}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${step.statusType === "pilot" ? "bg-emerald-50 text-emerald-800" : "bg-ink/6 text-ink/75"}`}>
                {step.statusType === "pilot" ? <IconCheck className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-cyan-deep" />}
                {step.status}
              </span>
              {activeStep === 1 && <span className="rounded-full bg-cyan/10 px-3 py-1.5 text-xs font-semibold text-ink/75">{t.how.illustrativeLabel}</span>}
            </div>
            <h3 className="mt-6 max-w-xl font-display text-3xl leading-tight text-ink md:text-4xl" aria-live="polite">
              {step.title}
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/70 md:text-[1.02rem]">{step.body}</p>

          </div>

          <div key={`visual-${activeStep}`} className={`flex min-h-[18rem] items-center rounded-2xl bg-cream p-4 md:min-h-[21rem] md:p-7 ${reducedMotion ? "" : "how-step-enter"}`}>
            {activeStep === 0 ? (
              <SourceDocumentsVisual title={step.visualTitle} />
            ) : activeStep === 1 ? (
              <div className="w-full">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">{step.visualTitle}</p>
                <DocumentFlow />
              </div>
            ) : (
              <ConceptVisual
                title={step.visualTitle}
                items={step.visualItems}
                icon={activeIcon}
                illustrativeLabel={t.how.futureScope}
                imageLabel={t.how.imageLabel}
                conceptNote={t.how.conceptNote}
                exploreLabel={t.how.exploreLabel}
                reviewLabel={t.how.reviewLabel}
                activeStep={activeStep}
              />
            )}
          </div>
        </div>

        <div id="jornada" className="relative mt-12 scroll-mt-28">
          <div aria-hidden="true" className="pointer-events-none absolute left-[10%] right-[10%] top-9 hidden h-1 overflow-hidden rounded-full bg-ink/20 md:block">
            <span
              className="block h-full rounded-full bg-cyan-deep"
              style={{
                width: `${(activeStep / (t.stepNames.length - 1)) * 100}%`,
                transition: reducedMotion ? "none" : "width 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
          <div
            role="tablist"
            aria-label={t.journey.progressLabel}
            className="grid grid-cols-2 gap-2 pb-3 sm:grid-cols-3 md:grid-cols-5 md:gap-2"
          >
            {t.stepNames.map((name, index) => {
              const StepIcon = STEP_ICONS[index];
              const selected = activeStep === index;
              return (
                <button
                  key={name}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-current={selected ? "step" : undefined}
                  id={`how-step-tab-${index}`}
                  aria-controls="how-step-panel"
                  aria-label={`${t.how.phase} ${index + 1}: ${name}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  style={entered && !reducedMotion ? { animationDelay: `${index * 55}ms` } : undefined}
                  className={`group relative z-[1] flex min-w-0 flex-col items-center rounded-xl border px-2 py-3 text-center outline-none transition-colors duration-200 ${selected ? "border-cyan-deep/25 bg-white shadow-[0_8px_22px_rgba(12,21,36,0.08)]" : "border-transparent hover:border-ink/10 hover:bg-white/65"} ${reveal}`}
                >
                  <span className={`grid h-12 w-12 place-items-center rounded-full border shadow-sm transition-colors duration-300 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-cyan ${selected ? "border-cyan-deep bg-cyan text-ink shadow-[0_4px_12px_rgba(0,196,212,0.28)]" : "border-ink/15 bg-white text-ink group-hover:border-cyan-deep/50"}`}>
                    <StepIcon className="h-5 w-5" />
                  </span>
                  <span className={`mt-3 text-sm font-bold ${selected ? "text-ink" : "text-ink/70"}`}>{name}</span>
                </button>
              );
            })}
          </div>
        </div>

          <nav className="mt-5 flex items-center justify-center gap-1 text-ink sm:gap-2" aria-label={t.journey.progressLabel}>
            <button
              type="button"
              onClick={() => changeStep(-1)}
              disabled={activeStep === 0}
              aria-label={t.how.previousStep}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
            >
              <IconArrow className="rotate-180" />
            </button>
            <div className="flex items-center" role="group" aria-label={t.journey.progressLabel}>
              {t.stepNames.map((name, index) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-label={`${t.how.phase} ${index + 1}: ${name}`}
                  aria-pressed={activeStep === index}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:h-11 sm:w-11"
                >
                  <span className={`block rounded-full transition-all ${activeStep === index ? "h-3 w-3 bg-cyan-deep" : "h-2.5 w-2.5 bg-ink/25"}`} />
                </button>
              ))}
            </div>
            <span className="min-w-[3.5rem] text-center font-mono text-xs font-bold tabular-nums tracking-[0.12em] text-ink/75" aria-live="polite">
              {String(activeStep + 1).padStart(2, "0")} / {String(t.how.steps.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => changeStep(1)}
              disabled={activeStep === t.how.steps.length - 1}
              aria-label={t.how.nextStep}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
            >
              <IconArrow />
            </button>
          </nav>

      </div>
    </section>
  );
}

function SourceDocumentsVisual({ title }: { title: string }) {
  const { t } = useLanguage();
  const documents = [
    { title: t.flow.electricityBill, icon: IconBolt, tone: "text-cyan-deep bg-cyan/10" },
    { title: t.flow.waterUse, icon: IconDrop, tone: "text-sky-600 bg-sky-50" },
    { title: t.flow.wasteReport, icon: IconRecycle, tone: "text-emerald-700 bg-emerald-50" },
  ];

  return (
    <div className="mx-auto w-full max-w-[34rem]">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">{title}</p>
      <ul className="space-y-3" aria-label={title}>
        {documents.map(({ title: documentTitle, icon: Icon, tone }) => (
          <li key={documentTitle} className="group flex min-w-0 items-center gap-3 rounded-2xl border border-ink/15 border-l-4 border-l-cyan-deep bg-white px-4 py-3 shadow-[0_10px_28px_rgba(12,21,36,0.1)] transition-shadow hover:shadow-[0_14px_34px_rgba(12,21,36,0.14)] sm:gap-4 sm:px-5">
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-extrabold text-ink sm:text-base">{documentTitle}</span>
              <span className="mt-1 block text-xs font-medium text-ink/65">{t.illustrative}</span>
            </span>
            <span className="shrink-0 rounded-md border border-ink/10 bg-slate-100 px-2.5 py-1.5 text-[0.65rem] font-extrabold tracking-wide text-ink/70">PDF</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-xs leading-relaxed text-ink/65">{t.flow.illustrativeNotice}</p>
    </div>
  );
}

function ConceptVisual({
  title,
  items,
  icon: Icon,
  illustrativeLabel,
  imageLabel,
  conceptNote,
  exploreLabel,
  reviewLabel,
  activeStep,
}: {
  title: string;
  items: readonly string[];
  icon: typeof IconChart;
  illustrativeLabel: string;
  imageLabel: string;
  conceptNote: string;
  exploreLabel: string;
  reviewLabel: string;
  activeStep: number;
}) {
  const conceptImage = activeStep === 2
    ? "/images/vision-hotel-solar.webp"
    : activeStep === 3
      ? "/images/vision-forest-retreat.webp"
      : null;
  return (
    <div className="mx-auto w-full max-w-[34rem] rounded-2xl bg-navy p-5 text-white shadow-xl md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <h4 className="font-display text-lg font-bold md:text-xl">{title}</h4>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.65rem] font-semibold text-white/65">{illustrativeLabel}</span>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-3 md:px-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan/15 text-cyan">
              {index === 0 ? <Icon className="h-5 w-5" /> : <span className="font-mono text-xs font-bold">0{index + 1}</span>}
            </span>
            <span className="flex-1 text-sm font-medium text-white/90">{item}</span>
            {activeStep === 2 && index < 2 ? <span className="rounded-full bg-white/10 px-2 py-1 text-[0.62rem] text-white/60">{index === 0 ? exploreLabel : reviewLabel}</span> : null}
            {activeStep === 3 && index < 2 ? <span className="h-2 w-16 rounded-full bg-white/10" aria-hidden="true" /> : null}
            {activeStep === 4 && index < 2 ? <IconFile className="h-4 w-4 text-cyan/80" /> : null}
          </div>
        ))}
      </div>
      {conceptImage && (
        <figure className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <img src={conceptImage} alt="" className="h-24 w-full object-cover md:h-28" loading="lazy" />
          <figcaption className="bg-navy-2 px-3 py-2 text-[0.65rem] text-white/65">{imageLabel}</figcaption>
        </figure>
      )}
      <p className="mt-5 text-xs leading-relaxed text-white/55">
        {conceptNote}
      </p>
    </div>
  );
}
