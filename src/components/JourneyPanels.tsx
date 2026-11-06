import { IMG } from "../assets/media";
import { STEPS } from "../data/content";
import { IconBolt, IconChart, IconClipboard, IconFile } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";

const BACKGROUNDS = [
  IMG.hotelNight,
  IMG.hotelDusk,
  IMG.hotelPoolDay,
  IMG.leavesOverlay,
  IMG.landscapeHills,
];

type JourneyPanelsProps = { methodStart: number; activeStep: number };

export function JourneyPanels({ methodStart, activeStep }: JourneyPanelsProps) {
  const { t } = useLanguage();
  const visibleSteps = STEPS.slice(methodStart, methodStart + 3);
  return (
    <div className="relative flex h-full w-full flex-col px-2 pb-24 pt-20 sm:px-3 lg:pb-28 lg:pt-24">
      <ol className="relative z-[3] mb-4 flex items-center justify-center gap-3" aria-label={t.journey.progressLabel}>
        {STEPS.map((step, i) => (
          <li key={step.id} className="flex items-center gap-2">
            <span className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? "w-7 bg-cyan" : "w-1.5 bg-white/45"}`} />
          </li>
        ))}
        <li className="ml-1 font-mono text-[0.62rem] font-semibold tracking-[0.12em] text-white/90" aria-live="polite">
          {String(activeStep + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </li>
      </ol>
      <div className="relative flex min-h-0 flex-1">
      {visibleSteps.map((step, visibleIndex) => {
        const i = methodStart + visibleIndex;
        const isActive = i === activeStep;
        return (
        <article
          key={step.id}
          aria-current={isActive ? "step" : undefined}
          className={`journey-slice relative h-full min-w-0 flex-1 border-l border-white/25 first:border-l-0 ${isActive ? "journey-slice-active" : "journey-slice-inactive"}`}
          style={{
            zIndex: visibleSteps.length - visibleIndex,
          }}
        >
          <img
            src={BACKGROUNDS[i]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/25 via-navy/20 to-navy/70" />

          <div className="relative z-[2] flex h-full flex-col px-2 pb-20 pt-24 md:px-3 lg:px-4">
            <p className="font-display text-3xl leading-none text-white md:text-4xl">{step.num}</p>
            <span className={`mt-2 block h-0.5 w-6 ${isActive ? "bg-cyan" : "bg-cyan/70"}`} />
            <h3 className="mt-3 font-display text-sm leading-tight text-white md:text-base xl:text-lg">{t.stepNames[i]}</h3>
            <p className="mt-2 max-w-[12rem] text-[0.72rem] leading-snug text-white/95 md:text-xs">{t.stepTexts[i]}</p>

            <div className="mt-auto pb-4">
              <StepVisual index={i} />
            </div>
          </div>
        </article>
      );})}
      </div>
    </div>
  );
}

function StepVisual({ index }: { index: number }) {
  const { t, language } = useLanguage();
  if (index === 0) {
    return (
      <div className="relative h-36">
        <div className="doc-card absolute left-1 top-4 w-24 -rotate-6 p-2.5">
          <span className="text-[0.55rem] font-bold text-cyan-deep">⚡ {language === "pt" ? "Fatura" : "Bill"}</span>
          <p className="mt-1 text-[0.68rem] font-bold leading-tight text-ink">{t.flow.electricityBill}</p>
          <span className="mt-3 inline-block rounded bg-slate-100 px-1 text-[0.5rem] font-bold text-slate-400">PDF</span>
        </div>
        <div className="doc-card absolute left-3 top-0 w-24 rotate-3 p-2.5">
          <p className="text-[0.68rem] font-semibold text-ink">{t.flow.waterUse}</p>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="w-[min(100%,11.5rem)] rounded-xl bg-navy/85 p-3 text-white shadow-xl backdrop-blur">
        <p className="text-[0.62rem] font-semibold">{t.flow.organizedData}</p>
        <p className="text-[0.5rem] text-white/45">({t.illustrative})</p>
        <ul className="mt-2 space-y-1 text-[0.62rem]">
          <li className="flex justify-between"><span>{t.metrics[0]}</span><span className="font-bold">12.460 kWh</span></li>
          <li className="flex justify-between"><span>{t.metrics[1]}</span><span className="font-bold">401 m³</span></li>
          <li className="flex justify-between"><span>{t.metrics[2]}</span><span className="font-bold">2.320 kg</span></li>
        </ul>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="grid h-20 w-20 place-items-center rounded-2xl bg-cyan/90 text-ink shadow-lg">
        <IconChart className="h-10 w-10" />
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className="w-24 rounded-2xl bg-navy/80 p-3 backdrop-blur">
        <div className="mb-2 flex items-center gap-2 text-cyan">
          <span className="grid h-4 w-4 place-items-center rounded bg-cyan text-[0.6rem] font-bold text-ink">✓</span>
          <span className="h-1.5 flex-1 rounded bg-white/25" />
        </div>
        <div className="mb-2 flex items-center gap-2 text-white/40">
          <span className="h-4 w-4 rounded border border-white/30" />
          <span className="h-1.5 flex-1 rounded bg-white/15" />
        </div>
        <div className="flex items-center gap-2 text-white/40">
          <span className="h-4 w-4 rounded border border-white/30" />
          <span className="h-1.5 flex-1 rounded bg-white/15" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex max-w-full items-center gap-1.5 rounded-2xl bg-white/90 p-2.5 text-ink shadow-lg">
      <IconFile className="h-7 w-7 shrink-0 text-cyan-deep" />
      <IconClipboard className="h-5 w-5 shrink-0 text-ink/40" />
      <IconBolt className="h-4 w-4 shrink-0 text-cyan-deep" />
    </div>
  );
}
