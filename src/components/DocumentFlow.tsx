import { ILLUSTRATIVE_METRICS } from "../data/content";
import { IconBolt, IconDrop, IconLink, IconRecycle } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";

type DocumentFlowProps = { layout?: "stack" | "wide" };

export function DocumentFlow({ layout = "stack" }: DocumentFlowProps) {
  const { t } = useLanguage();
  const wideLayout = layout === "wide";
  return (
    <div className="w-full max-w-full overflow-hidden">
    <p className="mb-3 inline-flex max-w-full flex-wrap break-words rounded-lg border border-cyan-deep/20 bg-cyan/10 px-3 py-2 text-xs font-semibold leading-relaxed text-ink/75">
      {t.flow.illustrativeNotice}
    </p>
    <div className={`grid w-full grid-cols-1 justify-items-center gap-5 ${wideLayout ? "xl:grid-cols-[260px_44px_minmax(0,420px)] xl:items-center xl:justify-center xl:gap-3" : ""}`}>
      <div className="relative h-[220px] w-full max-w-[260px] sm:h-[240px]">
        <article className="doc-card anim-float absolute right-2 top-0 w-[min(72%,190px)] rotate-[6deg] border border-ink/5 p-4 sm:right-1">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <IconRecycle className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[0.78rem] font-semibold leading-snug text-ink">{t.flow.wasteReport}</p>
        </article>
        <article
          className="doc-card anim-float absolute left-1/2 top-8 w-[min(76%,200px)] -translate-x-1/2 rotate-[2deg] border border-ink/5 p-4"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 text-cyan-deep">
            <IconDrop className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[0.78rem] font-semibold leading-snug text-ink">{t.flow.waterUse}</p>
        </article>
        <article
          className="doc-card anim-float absolute bottom-0 left-1 w-[min(78%,205px)] -rotate-[4deg] border border-ink/5 p-4"
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

      <div className="relative z-[1] grid h-10 w-10 place-items-center rounded-full bg-cyan text-ink shadow-[0_0_0_6px_rgba(45,232,240,0.15)] xl:h-11 xl:w-11">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="w-full min-w-0 max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-navy p-4 text-white shadow-[0_18px_44px_rgba(11,21,38,0.22)] sm:p-5">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="text-[0.95rem] font-bold">{t.flow.organizedData}</h3>
          <span className="text-[0.7rem] font-medium text-white/75">({t.illustrative})</span>
        </div>
        <ul className="space-y-2">
          {ILLUSTRATIVE_METRICS.map((m, i) => {
            const Icon = [IconBolt, IconDrop, IconRecycle][i];
            return (
              <li
                key={m.id}
                className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 rounded-xl border border-white/5 bg-white/[0.06] px-2.5 py-2.5 sm:grid-cols-[20px_minmax(0,1fr)_auto_auto] sm:gap-3 sm:px-3"
              >
                <Icon className="h-4 w-4 text-cyan" />
                <span className="text-[0.82rem] font-medium">{t.metrics[i]}</span>
                <span className="text-[0.82rem] font-bold tabular-nums">
                  {m.value} {m.unit}
                </span>
                  <span className="col-start-2 col-span-2 inline-flex min-w-0 max-w-full items-center gap-1 rounded-lg bg-white/8 px-2 py-1 text-[0.65rem] text-cyan sm:col-span-1">
                  <IconLink />
                  <span className="truncate">{m.source}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  );
}
