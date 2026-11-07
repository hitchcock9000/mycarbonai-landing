import { useState } from "react";
import { IMG } from "../assets/media";
import { STEPS } from "../data/content";
import { useLanguage } from "../i18n/LanguageProvider";

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
                className="relative z-[2] flex h-full w-full flex-col px-2 pb-36 pt-28 text-left focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cyan md:px-3 lg:px-4 lg:pt-32"
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

    </div>
  );
}
