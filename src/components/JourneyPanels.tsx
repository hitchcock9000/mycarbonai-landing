import { useState } from "react";
import { IMG } from "../assets/media";
import { STEPS } from "../data/content";
import { useLanguage } from "../i18n/LanguageProvider";
import { IconArrow } from "./Icons";

const BACKGROUNDS = [
  IMG.hotelNight,
  IMG.hotelDusk,
  IMG.hotelPoolDay,
  IMG.leavesOverlay,
  IMG.landscapeHills,
];

export function JourneyPanels() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const move = (amount: number) => setActiveStep((current) => Math.max(0, Math.min(STEPS.length - 1, current + amount)));

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex overflow-hidden bg-navy">
        {STEPS.map((step, i) => {
          const isActive = i === activeStep;
          return (
            <article
              key={step.id}
              className={`journey-slice relative h-full min-w-0 flex-1 ${isActive ? "journey-slice-active" : "journey-slice-inactive"}`}
              style={{ zIndex: STEPS.length - i }}
            >
              <img src={BACKGROUNDS[i]} alt="" className="journey-photo absolute inset-y-0 h-full w-[150%] max-w-none object-cover" style={{ left: "-25%" }} />
              <div className="journey-shade absolute inset-0" />
              <button
                type="button"
                aria-pressed={isActive}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${t.how.phase} ${i + 1}: ${t.stepNames[i]}`}
                onClick={() => setActiveStep(i)}
                className={`relative z-[2] flex h-full w-full flex-col px-2 pb-36 pt-28 text-left focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cyan md:px-3 lg:px-4 lg:pt-32 ${i === 0 ? "journey-first-step" : ""}`}
              >
                <span className="font-display text-3xl leading-none text-white md:text-4xl xl:text-5xl">{step.num}</span>
                <span className={`mt-2 block h-0.5 w-7 ${isActive ? "bg-cyan" : "bg-cyan/85"}`} />
                <span className="mt-3 font-display text-sm leading-tight text-white md:text-base xl:text-xl">{t.stepNames[i]}</span>
                <span className="mt-2 max-w-[13rem] text-[0.72rem] leading-snug text-white md:text-xs xl:text-sm">{t.stepTexts[i]}</span>
              </button>
            </article>
          );
        })}
      </div>

      <nav className="absolute bottom-[5.25rem] left-1/2 z-30 flex w-fit max-w-[calc(100%-1rem)] -translate-x-1/2 items-center justify-center gap-1 rounded-full bg-navy/75 px-2 py-1 text-white shadow-lg shadow-black/20 backdrop-blur-sm sm:gap-2" aria-label={t.journey.progressLabel}>
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={activeStep === 0}
          aria-label={t.how.previousStep}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
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
              className="grid h-9 w-8 shrink-0 place-items-center rounded-full transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan sm:h-11 sm:w-10"
            >
              <span className={`block rounded-full transition-all ${activeStep === index ? "h-3 w-3 bg-cyan" : "h-2.5 w-2.5 bg-white/45"}`} />
            </button>
          ))}
        </div>
        <span className="min-w-[3.25rem] text-center font-mono text-[0.62rem] font-bold tabular-nums tracking-[0.12em] text-white/90" aria-live="polite">
          {String(activeStep + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={activeStep === STEPS.length - 1}
          aria-label={t.how.nextStep}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
        >
          <IconArrow />
        </button>
      </nav>
    </div>
  );
}
