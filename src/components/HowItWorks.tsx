import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { IconArrow, IconBolt, IconBuilding, IconChart, IconCheck, IconDrop, IconFile, IconLeaf, IconLink, IconRecycle, IconUser } from "./Icons";
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
  const totalSteps = t.how.steps.length;
  const isLastStep = activeStep === totalSteps - 1;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const selectAndFocus = (index: number) => {
    const next = Math.max(0, Math.min(totalSteps - 1, index));
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectAndFocus(index === totalSteps - 1 ? 0 : index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectAndFocus(index === 0 ? totalSteps - 1 : index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectAndFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectAndFocus(totalSteps - 1);
    }
  };

  const changeStep = (amount: number) => {
    setActiveStep((current) => Math.max(0, Math.min(totalSteps - 1, current + amount)));
  };
  const reveal = entered && !reducedMotion ? "how-section-reveal" : "";

  return (
    <section ref={sectionRef} id="como-funciona" className="relative scroll-mt-24 overflow-hidden bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-10">
        <header className={`max-w-3xl ${reveal}`}>
          <p className="kicker flex items-center gap-3 text-ink/60">
            <span className="inline-block h-0.5 w-8 bg-cyan" />
            {t.how.kicker}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-ink lg:text-[3.2rem]">{t.how.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">{t.how.body}</p>
        </header>

        <div id="jornada" className={`relative mt-10 scroll-mt-28 ${reveal}`}>
          <div aria-hidden="true" className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-ink/15 md:block">
            <span className="block h-full bg-cyan-deep transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(activeStep / (totalSteps - 1)) * 100}%` }} />
          </div>
          <div role="tablist" aria-label={t.journey.progressLabel} className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
            {t.stepNames.map((name, index) => {
              const StageIcon = STEP_ICONS[index];
              const selected = activeStep === index;
              return (
                <button
                  key={name}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  type="button"
                  role="tab"
                  id={`how-step-tab-${index}`}
                  aria-controls="how-step-panel"
                  aria-selected={selected}
                  aria-label={`${t.how.phase} ${index + 1}: ${name}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`group relative z-[1] flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border px-1.5 py-2.5 text-center outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:px-2 sm:py-3 ${selected ? "border-cyan-deep/40 bg-white shadow-[0_5px_18px_rgba(12,21,36,0.07)]" : "border-transparent hover:border-ink/10 hover:bg-white/70"}`}
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-full border transition-colors sm:h-12 sm:w-12 ${selected ? "border-cyan bg-cyan text-ink" : "border-ink/15 bg-white text-ink"}`}>
                    <StageIcon className="h-5 w-5" />
                  </span>
                  <span className={`text-xs font-bold leading-tight sm:text-sm ${selected ? "text-ink" : "text-ink/75"}`}>{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="how-step-panel"
          role="tabpanel"
          aria-labelledby={`how-step-tab-${activeStep}`}
          tabIndex={0}
          className={`mt-6 rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-[0_15px_45px_rgba(4,20,35,0.07)] outline-none focus-visible:ring-2 focus-visible:ring-cyan md:p-8 lg:mt-7 lg:p-10 ${reveal}`}
        >
          <div className="grid items-center gap-7 lg:grid-cols-[minmax(250px,0.78fr)_minmax(0,1.22fr)] lg:gap-10">
            <div key={`copy-${activeStep}`} className={reducedMotion ? "" : "how-step-enter"}>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900">
                <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />{t.how.currentPilot}
              </span>
              <h3 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl" aria-live="polite">{t.stepNames[activeStep]}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/75 md:text-base">{step.currentText}</p>
              <div className="my-5 h-px w-full bg-ink/10" />
              <span className="inline-flex items-center gap-2 rounded-full bg-ink/[0.06] px-3 py-1.5 text-xs font-bold text-ink/75">
                <span className="h-2 w-2 rounded-full bg-cyan-deep" aria-hidden="true" />{t.how.futureVision}
              </span>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/65 md:text-base">{step.futureText}</p>
            </div>
            <div key={`illustration-${activeStep}`} className={`min-w-0 ${reducedMotion ? "" : "how-step-enter"}`}>
              <PhaseIllustration index={activeStep} labels={t.how.diagram} stage={t.stepNames[activeStep]} />
            </div>
          </div>

          <nav aria-label={t.how.slideNavigation} className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
            <button type="button" onClick={() => changeStep(-1)} disabled={activeStep === 0} aria-label={t.how.previousStep} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-cyan-deep hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-40">
              <IconArrow className="rotate-180" />{t.how.previousStep}
            </button>
            <div role="group" aria-label={t.journey.progressLabel} className="order-3 flex w-full items-center justify-center sm:order-none sm:w-auto">
              {t.stepNames.map((name, index) => (
                <button key={name} type="button" onClick={() => setActiveStep(index)} aria-label={`${t.how.phase} ${index + 1}: ${name}`} aria-current={activeStep === index ? "step" : undefined} className="grid h-9 w-7 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan sm:w-8">
                  <span className={`block rounded-full transition-[width,height,background-color] duration-200 motion-reduce:transition-none ${activeStep === index ? "h-3 w-3 bg-cyan-deep" : "h-2.5 w-2.5 bg-ink/20"}`} />
                </button>
              ))}
              <span className="ml-2 min-w-[3.5rem] text-center font-mono text-xs font-bold tabular-nums tracking-[0.12em] text-ink/75" aria-live="polite">{String(activeStep + 1).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}</span>
            </div>
            {isLastStep ? (
              <a href="/piloto" className="btn-primary inline-flex min-h-11 items-center gap-2 px-5 text-sm">{t.how.explorePilot}<IconArrow /></a>
            ) : (
              <button type="button" onClick={() => changeStep(1)} aria-label={t.how.nextStep} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan px-5 py-2 text-sm font-bold text-ink transition-colors hover:bg-cyan-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">{t.how.nextStep}<IconArrow /></button>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}

type DiagramLabels = {
  sources: readonly string[];
  record: string;
  linked: string;
  review: string;
  resource: string;
  period: string;
  source: string;
  value: string;
  attention: string;
  teamDecision: string;
  owner: string;
  nextReview: string;
  reportPrep: string;
  reportDraft: string;
  illustrative: string;
};

function PhaseIllustration({ index, labels, stage }: { index: number; labels: DiagramLabels; stage: string }) {
  return (
    <div className="relative min-h-[17rem] overflow-hidden rounded-2xl border border-ink/10 bg-cream p-4 sm:min-h-[19rem] sm:p-6" aria-label={`${stage} — ${labels.illustrative}`}>
      <span className="absolute right-4 top-4 rounded-full bg-cyan/15 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-ink/75 sm:right-5 sm:top-5">{labels.illustrative}</span>
      <div className="flex min-h-[15rem] items-center justify-center pt-9 sm:min-h-[16rem]">
        {index === 0 && <IdentifyDiagram labels={labels} />}
        {index === 1 && <MeasureDiagram labels={labels} />}
        {index === 2 && <ReduceDiagram labels={labels} />}
        {index === 3 && <ActDiagram labels={labels} />}
        {index === 4 && <ReportDiagram labels={labels} />}
      </div>
    </div>
  );
}

function IdentifyDiagram({ labels }: { labels: DiagramLabels }) {
  return (
    <div className="flex w-full max-w-[42rem] min-w-0 flex-col items-stretch gap-3 md:grid md:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1fr)] md:items-center md:gap-4">
      <div className="min-w-0 space-y-2.5">
        {labels.sources.map((source) => <div key={source} className="flex min-h-12 min-w-0 items-center gap-2 rounded-xl border border-ink/10 bg-white px-2.5 text-xs font-bold text-ink shadow-sm sm:min-h-14 sm:gap-3 sm:px-4 sm:text-sm"><IconFile className="h-4 w-4 shrink-0 text-cyan-deep sm:h-5 sm:w-5" /><span className="min-w-0 break-words">{source}</span></div>)}
      </div>
      <FlowArrow />
      <div className="min-w-0 rounded-2xl border border-ink/20 bg-white shadow-sm">
        <div className="rounded-t-2xl border-b border-cyan/50 bg-cyan/15 px-3 py-2 text-xs font-extrabold text-ink sm:px-4 sm:text-sm">{labels.record}</div>
        <div className="space-y-3 p-3 sm:p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-ink/75 sm:text-sm"><IconLink className="h-4 w-4 shrink-0 text-cyan-deep" />{labels.linked}</p>
          <p className="flex items-center gap-2 text-xs font-semibold leading-snug text-ink/75 sm:text-sm"><IconUser className="h-4 w-4 shrink-0 text-cyan-deep" />{labels.review}</p>
        </div>
      </div>
    </div>
  );
}

function MeasureDiagram({ labels }: { labels: DiagramLabels }) {
  return (
    <div className="flex w-full max-w-[42rem] min-w-0 flex-col items-stretch gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center md:gap-4">
      <div className="min-w-0 overflow-hidden rounded-xl border border-ink/20 bg-white">
        <div className="grid grid-cols-4 border-b border-ink/10 bg-cyan/15 px-1.5 py-2 text-[0.58rem] font-extrabold leading-tight text-ink sm:px-3 sm:text-xs">
          <span>{labels.resource}</span><span>{labels.period}</span><span>{labels.source}</span><span>{labels.value}</span>
        </div>
        {[IconBolt, IconDrop, IconRecycle].map((ResourceIcon, i) => <div key={i} className="grid min-h-12 grid-cols-4 items-center border-b border-ink/10 px-1.5 last:border-0 sm:px-3"><span className="text-cyan-deep"><ResourceIcon className="h-4 w-4" /></span><span className="h-1.5 w-8 rounded-full bg-ink/15 sm:w-12" /><span className="mx-auto text-ink/65"><IconLink className="h-4 w-4" /></span><span className="h-1.5 w-8 rounded-full bg-ink/15 sm:w-12" /></div>)}
      </div>
      <FlowArrow />
      <div className="rounded-xl border border-cyan-deep/40 bg-white px-3 py-3 text-center text-xs font-extrabold text-ink sm:px-5 sm:py-4 sm:text-sm">CO₂e<br /><span className="font-semibold text-ink/65">{labels.value}</span></div>
    </div>
  );
}

function ReduceDiagram({ labels }: { labels: DiagramLabels }) {
  return (
    <div className="w-full min-w-0 max-w-[40rem] rounded-2xl border border-ink/20 bg-white p-4 sm:p-6">
      <div className="flex flex-wrap gap-3 text-xs font-bold text-ink sm:text-sm"><span className="inline-flex items-center gap-2"><IconBolt className="text-cyan-deep" />{labels.sources[0]}</span><span className="inline-flex items-center gap-2"><IconDrop className="text-cyan-deep" />{labels.sources[1]}</span></div>
      <div className="relative mt-5 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-cream sm:h-36">
        <svg viewBox="0 0 500 140" className="h-full w-full" aria-hidden="true"><path d="M10 82 C75 30, 105 120, 170 72 S260 110, 320 60 S415 100, 490 50" fill="none" stroke="#0b1526" strokeWidth="3" /><path d="M10 112 C75 75, 105 125, 170 95 S260 115, 320 80 S415 118, 490 90" fill="none" stroke="#00c4d4" strokeWidth="3" /></svg>
        <span className="absolute left-[55%] top-1/2 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-white/80 text-cyan-deep sm:h-20 sm:w-20"><IconLeaf className="h-7 w-7" /></span>
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-ink/70 sm:text-sm">{labels.attention}</p>
    </div>
  );
}

function ActDiagram({ labels }: { labels: DiagramLabels }) {
  return (
    <div className="flex w-full max-w-[40rem] flex-col items-stretch gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-4">
      <div className="grid min-w-0 h-36 place-items-center rounded-xl border border-ink/20 bg-white sm:h-44"><div className="text-center text-ink/70"><IconBuilding className="mx-auto h-10 w-10 text-ink" /><span className="mt-2 block max-w-28 text-xs font-bold sm:text-sm">{labels.teamDecision}</span></div></div>
      <FlowArrow />
      <div className="min-w-0 rounded-xl border border-ink/20 bg-white px-3 sm:px-4">
        {[labels.teamDecision, labels.owner, labels.nextReview].map((item, i) => <div key={item} className="flex min-h-11 items-center gap-2 border-b border-ink/10 text-[0.65rem] font-bold text-ink last:border-0 sm:min-h-12 sm:gap-3 sm:text-xs">{i === 0 ? <IconCheck className="h-4 w-4 text-cyan-deep" /> : i === 1 ? <IconUser className="h-4 w-4" /> : <IconChart className="h-4 w-4" />}{item}</div>)}
      </div>
    </div>
  );
}

function ReportDiagram({ labels }: { labels: DiagramLabels }) {
  return (
    <div className="flex w-full max-w-[40rem] min-w-0 flex-col items-stretch gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-4">
      <div className="min-w-0 space-y-2.5">{labels.sources.map((source) => <div key={source} className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl border border-ink/15 bg-white px-2.5 text-xs font-bold text-ink sm:min-h-12 sm:gap-3 sm:px-4 sm:text-sm"><IconFile className="h-4 w-4 shrink-0 text-cyan-deep" /><span className="min-w-0 break-words">{source}</span><IconLink className="ml-auto h-4 w-4 shrink-0 text-cyan-deep" /></div>)}</div>
      <FlowArrow />
      <div className="min-w-0 rounded-xl border border-ink/20 bg-white p-3 sm:p-4">
        <span className="mb-2 inline-flex rounded-full bg-cyan/15 px-2.5 py-1 text-[0.6rem] font-extrabold text-ink/70">{labels.reportDraft}</span>
        <div className="flex items-start gap-2"><IconFile className="mt-0.5 h-5 w-5 shrink-0 text-ink" /><div className="w-full space-y-2"><span className="block h-1.5 w-3/4 rounded-full bg-ink/65" /><span className="block h-1 w-full rounded-full bg-ink/15" /><span className="block h-1 w-5/6 rounded-full bg-ink/15" /><span className="block h-1 w-2/3 rounded-full bg-ink/15" /></div></div>
        <p className="mt-3 text-[0.65rem] font-semibold leading-snug text-ink/65 sm:text-xs">{labels.reportPrep}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return <IconArrow className="mx-auto h-5 w-5 shrink-0 rotate-90 text-cyan-deep sm:h-6 sm:w-6 md:rotate-0" />;
}
