import { DOCUMENTS, ILLUSTRATIVE_METRICS } from "../data/content";
import { LogoMark } from "./Logo";
import {
  IconBolt,
  IconBox,
  IconBuilding,
  IconChart,
  IconCheck,
  IconChevron,
  IconClipboard,
  IconDrop,
  IconFile,
  IconHome,
  IconRecycle,
} from "./Icons";
import { cn } from "../utils/cn";
import { useLanguage } from "../i18n/LanguageProvider";

const NAV_ITEMS = [
  { id: "overview", label: "Visão geral", icon: IconHome, active: true },
  { id: "docs", label: "Documentos", icon: IconFile },
  { id: "review", label: "Revisão", icon: IconCheck },
  { id: "evidence", label: "Dados e Evidências", icon: IconClipboard },
  { id: "reports", label: "Relatórios", icon: IconChart },
] as const;

const METRIC_ICONS = {
  energia: IconBolt,
  agua: IconDrop,
  residuos: IconRecycle,
} as const;

export function Dashboard({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        "dash-shell relative overflow-hidden rounded-2xl text-white",
        className,
      )}
      role="img"
      aria-label={t.dashboard.aria}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-3">
        <div className="flex items-center gap-2 text-cyan">
          <LogoMark className="h-6 w-5" />
          <span className="text-[0.82rem] font-bold tracking-tight">MyCarbonAI</span>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[0.68rem] font-medium text-white/80"
          tabIndex={-1}
        >
          <IconBuilding className="h-3.5 w-3.5 text-white/60" />
          {t.common.hotelName}
          <IconChevron className="h-3 w-3 opacity-70" />
        </button>
      </div>

      <div className="grid max-w-full grid-cols-[7.2rem_minmax(0,1fr)] overflow-hidden md:grid-cols-[8.4rem_minmax(0,1fr)]">
        <aside className="min-w-0 overflow-hidden border-r border-white/6 px-2 py-3">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <span
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.68rem] font-medium",
                      "active" in item && item.active
                        ? "bg-cyan/15 text-cyan"
                        : "text-white/55",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.dashboard.nav[NAV_ITEMS.indexOf(item)]}
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="min-w-0 max-w-full overflow-hidden px-4 py-3 md:px-5">
          <h2 className="text-[1.05rem] font-bold tracking-tight">{t.dashboard.overview}</h2>
          <p className="mt-0.5 text-[0.68rem] text-white/50">
            {t.dashboard.overviewBody}
          </p>

          <div className="mt-3 grid max-w-full grid-cols-2 gap-2 overflow-hidden lg:grid-cols-4">
            {ILLUSTRATIVE_METRICS.map((m) => {
              const Icon = METRIC_ICONS[m.id as keyof typeof METRIC_ICONS];
              return (
                <div
                  key={m.id}
                  className="min-w-0 max-w-full overflow-hidden rounded-xl border border-white/8 bg-[#162033] px-2.5 py-2.5"
                >
                  <Icon className="h-4 w-4 text-cyan" />
                  <p className="mt-2 text-[0.62rem] text-white/50">{t.metrics[ILLUSTRATIVE_METRICS.indexOf(m)]}</p>
                  <p className="text-[0.95rem] font-bold leading-tight">
                    {m.value} <span className="text-[0.7rem] font-semibold text-white/70">{m.unit}</span>
                  </p>
                  <span className="badge-illust mt-1.5">{t.illustrative}</span>
                </div>
              );
            })}
            <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-white/8 bg-[#162033] px-2.5 py-2.5">
              <IconBox className="h-4 w-4 text-cyan" />
              <p className="mt-2 text-[0.62rem] text-white/50">{t.dashboard.suppliers}</p>
              <p className="text-[0.95rem] font-bold leading-tight">24</p>
              <span className="badge-illust mt-1.5">{t.dashboard.organizedRecords}</span>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-white/8 bg-[#10192b] px-3 py-2.5">
            <p className="mb-2 text-[0.72rem] font-semibold text-white/80">{t.dashboard.documents}</p>
            <ul className="space-y-1.5">
              {DOCUMENTS.map((d) => (
                <li
                  key={d.id}
                  className="grid grid-cols-[16px_1fr_auto_auto_auto] items-center gap-2 text-[0.66rem] text-white/75"
                >
                  <IconFile className="h-3.5 w-3.5 text-white/40" />
                  <span className="truncate">{t.docs[DOCUMENTS.indexOf(d)]}</span>
                  <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[0.58rem] font-semibold text-emerald-300">
                    {t.linked}
                  </span>
                  <span className="hidden text-white/40 sm:inline">{d.origin}</span>
                  <span className="text-white/40">{t.dashboard.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
