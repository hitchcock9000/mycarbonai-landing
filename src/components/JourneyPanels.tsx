import { IMG } from "../assets/media";
import { STEPS } from "../data/content";
import { IconBolt, IconChart, IconClipboard, IconFile } from "./Icons";

const BACKGROUNDS = [
  IMG.hotelNight,
  IMG.hotelDusk,
  IMG.hotelPoolDay,
  IMG.leavesOverlay,
  IMG.landscapeHills,
];

export function JourneyPanels() {
  return (
    <div className="relative flex h-full w-full">
      {STEPS.map((step, i) => (
        <article
          key={step.id}
          className="journey-slice relative -ml-[2.2%] h-full min-w-0 flex-1 first:ml-0"
          style={{
            zIndex: STEPS.length - i,
            clipPath:
              i === 0
                ? "polygon(0 0, 100% 0, 86% 100%, 0 100%)"
                : i === STEPS.length - 1
                  ? "polygon(16% 0, 100% 0, 100% 100%, 0 100%)"
                  : "polygon(16% 0, 100% 0, 86% 100%, 0 100%)",
          }}
        >
          <img
            src={BACKGROUNDS[i]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/25 via-navy/20 to-navy/70" />

          <div className="relative z-[2] flex h-full flex-col px-5 pb-16 pt-24 md:px-7 lg:px-8">
            <p className="font-display text-5xl leading-none text-white md:text-6xl">{step.num}</p>
            <span className="mt-2 block h-0.5 w-8 bg-cyan" />
            <h3 className="mt-4 font-display text-2xl text-white md:text-[1.85rem]">{step.title}</h3>
            <p className="mt-3 max-w-[16rem] text-[0.9rem] leading-snug text-white/85">{step.text}</p>

            <div className="mt-auto pb-4">
              <StepVisual index={i} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative h-36">
        <div className="doc-card absolute left-2 top-4 w-28 -rotate-6 p-2.5">
          <span className="text-[0.55rem] font-bold text-cyan-deep">⚡ Fatura</span>
          <p className="mt-1 text-[0.68rem] font-bold leading-tight text-ink">Fatura de eletricidade</p>
          <span className="mt-3 inline-block rounded bg-slate-100 px-1 text-[0.5rem] font-bold text-slate-400">PDF</span>
        </div>
        <div className="doc-card absolute left-10 top-0 w-28 rotate-3 p-2.5">
          <p className="text-[0.68rem] font-semibold text-ink">Consumo de água</p>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="w-[min(100%,11.5rem)] rounded-xl bg-navy/85 p-3 text-white shadow-xl backdrop-blur">
        <p className="text-[0.62rem] font-semibold">Dados organizados</p>
        <p className="text-[0.5rem] text-white/45">(exemplo ilustrativo)</p>
        <ul className="mt-2 space-y-1 text-[0.62rem]">
          <li className="flex justify-between"><span>Energia</span><span className="font-bold">12.460 kWh</span></li>
          <li className="flex justify-between"><span>Água</span><span className="font-bold">401 m³</span></li>
          <li className="flex justify-between"><span>Resíduos</span><span className="font-bold">2.320 kg</span></li>
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
    <div className="flex items-center gap-2 rounded-2xl bg-white/90 p-3 text-ink shadow-lg">
      <IconFile className="h-8 w-8 text-cyan-deep" />
      <IconClipboard className="h-6 w-6 text-ink/40" />
      <IconBolt className="h-5 w-5 text-cyan-deep" />
    </div>
  );
}
