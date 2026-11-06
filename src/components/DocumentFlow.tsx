import { ILLUSTRATIVE_METRICS } from "../data/content";
import { IconBolt, IconDrop, IconLink, IconRecycle } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";

export function DocumentFlow() {
  const { t } = useLanguage();
  return (
    <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-2">
      <div className="relative h-[240px] w-[260px] shrink-0 sm:h-[280px] sm:w-[300px]">
        <article className="doc-card anim-float absolute left-16 top-0 w-[170px] rotate-[8deg] p-3 sm:w-[190px]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <IconRecycle className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[0.78rem] font-semibold leading-snug text-ink">{t.flow.wasteReport}</p>
        </article>
        <article
          className="doc-card anim-float absolute left-8 top-10 w-[170px] rotate-[3deg] p-3 sm:w-[190px]"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 text-cyan-deep">
            <IconDrop className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[0.78rem] font-semibold leading-snug text-ink">{t.flow.waterUse}</p>
        </article>
        <article
          className="doc-card anim-float absolute left-0 top-20 w-[180px] -rotate-[6deg] p-4 sm:w-[200px]"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan/15 text-cyan-deep">
            <IconBolt className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[0.95rem] font-bold leading-snug text-ink">{t.flow.electricityBill}</p>
          <div className="mt-6 flex items-end justify-between">
            <span className="h-1.5 w-16 rounded bg-slate-100" />
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.58rem] font-bold tracking-wide text-slate-400">
              PDF
            </span>
          </div>
        </article>
      </div>

      <div className="relative z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan text-ink shadow-[0_0_0_8px_rgba(45,232,240,0.18)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="w-full min-w-0 max-w-[420px] overflow-hidden rounded-2xl bg-navy p-4 text-white shadow-2xl">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="text-[0.95rem] font-bold">{t.flow.organizedData}</h3>
          <span className="text-[0.65rem] text-white/45">({t.illustrative})</span>
        </div>
        <ul className="space-y-2">
          {ILLUSTRATIVE_METRICS.map((m, i) => {
            const Icon = [IconBolt, IconDrop, IconRecycle][i];
            return (
              <li
                key={m.id}
                className="grid grid-cols-[20px_1fr_auto_auto] items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5"
              >
                <Icon className="h-4 w-4 text-cyan" />
                <span className="text-[0.82rem] font-medium">{t.metrics[i]}</span>
                <span className="text-[0.82rem] font-bold tabular-nums">
                  {m.value} {m.unit}
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-white/8 px-2 py-1 text-[0.65rem] text-cyan">
                  <IconLink />
                  {m.source}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
