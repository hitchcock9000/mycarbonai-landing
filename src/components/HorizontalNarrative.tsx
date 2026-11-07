import { useCallback, useEffect, useRef } from "react";
import { IMG } from "../assets/media";
import { CHAPTERS, ILLUSTRATIVE_METRICS, STEPS } from "../data/content";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { ChapterNav } from "./ChapterNav";
import { Dashboard } from "./Dashboard";
import { DocumentFlow } from "./DocumentFlow";
import { Header } from "./Header";
import { IconArrow, IconBolt, IconDrop, IconRecycle } from "./Icons";
import { JourneyPanels } from "./JourneyPanels";
import { LeftColumn } from "./LeftColumn";
import { ProcessSteps } from "./ProcessSteps";
import { useLanguage } from "../i18n/LanguageProvider";

const COUNT = CHAPTERS.length;

type Props = {
  onChapter?: (index: number) => void;
};

export function HorizontalNarrative({ onChapter }: Props) {
  const { t, language } = useLanguage();
  const pinRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1280px) and (min-height: 720px)");
  const reduced = useReducedMotion();
  const pinned = isDesktop && !reduced;
  const progress = useScrollProgress(pinRef, pinned);

  const raw = progress * (COUNT - 1);
  const active = Math.round(raw);
  const clampedActive = Math.min(COUNT - 1, Math.max(0, active));

  useEffect(() => {
    onChapter?.(clampedActive);
  }, [clampedActive, onChapter]);

  const goTo = useCallback(
    (index: number) => {
      const el = pinRef.current;
      if (!el) return;
      const next = Math.min(COUNT - 1, Math.max(0, index));
      if (!pinned) {
        const mobileIds = ["paisagem", "hotelaria", "documentos", "jornada-hero", "produto-hero"];
        document.getElementById(mobileIds[next] ?? CHAPTERS[next].id)?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
        return;
      }
      const start = window.scrollY + el.getBoundingClientRect().top;
      const total = Math.max(0, el.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: start + (next / (COUNT - 1)) * total,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [pinned, reduced],
  );

  const onHow = () => goTo(2);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    goTo(clampedActive + (dx < 0 ? 1 : -1));
  };

  const headerTheme: "light" | "dark" = clampedActive === 0 || clampedActive === 3 ? "dark" : "light";
  const navTheme: "light" | "dark" = headerTheme;

  if (!pinned) {
    return (
      <section ref={pinRef} id="topo" className="bg-forest">
        <MobileNarrative onHow={onHow} />
      </section>
    );
  }

  const translate = `translate3d(-${(raw / COUNT) * 100}%, 0, 0)`;
  const forestShift = progress * -6;
  const forestScale = 1.08 + progress * 0.04;

  return (
    <section
      ref={pinRef}
      id="topo"
      className="relative"
      style={{ height: `${COUNT * 100}svh` }}
      aria-label={t.common.narrativeLabel}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-forest">
        <div className="grain vignette absolute inset-0">
          <img
            src={IMG.forestRoad}
            alt={t.common.forestAlt}
            className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
            style={{
              transform: `translate3d(${forestShift}%, 0, 0) scale(${forestScale})`,
              transformOrigin: "30% 50%",
            }}
          />
          <div className="forest-shade absolute inset-0" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[5.5rem] bg-forest/90 shadow-lg shadow-black/10 backdrop-blur-sm md:h-20" />
        <Header
          theme="dark"
          logoTheme="dark"
        />

        <div className="relative z-10 flex h-full">
          <div className="relative z-20 w-[44%] max-w-[42rem] shrink-0 xl:w-[42%] 2xl:w-[40%]">
            <LeftColumn onHow={onHow} />
          </div>

          <div
            className="relative z-10 min-w-0 flex-1"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="flex h-full"
                style={{
                  width: `${COUNT * 100}%`,
                  transform: translate,
                  willChange: "transform",
                }}
              >
                <ChapterLandscape />
                <ChapterHotel />
                <ChapterDocuments />
                <ChapterJourney />
                <ChapterProduct />
              </div>
            </div>

            <div className="sr-only" aria-live="polite">
              {language === "en" ? "Chapter" : "Capítulo"} {clampedActive + 1} {language === "en" ? "of" : "de"} {COUNT}: {t.chapters[clampedActive]}
            </div>
            <div className="pointer-events-auto absolute bottom-6 left-8 right-8 z-20 flex justify-center lg:bottom-8">
              <ChapterNav
                active={clampedActive}
                onPrev={() => goTo(clampedActive - 1)}
                onNext={() => goTo(clampedActive + 1)}
                onDot={goTo}
                theme={navTheme}
                showHint={clampedActive === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterLandscape() {
  const { t } = useLanguage();
  return (
    <div className="relative h-full w-1/5 shrink-0" id="paisagem-desktop">
      <div className="absolute inset-0 flex items-end justify-end p-10 pb-28">
        <ol className="grid w-full max-w-[48rem] grid-cols-5 gap-3 text-white">
          {STEPS.map((s, i) => (
            <li key={s.id}>
              <p className="font-display text-4xl leading-none text-white/95 xl:text-5xl">{s.num}</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.1em] xl:text-sm">{t.stepNames[i]}</p>
              <span className="mt-2 block h-0.5 w-7 bg-cyan" />
              <p className="mt-3 text-xs leading-snug text-white/80 xl:text-[0.8rem]">{t.stepTexts[i]}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ChapterHotel() {
  const { t } = useLanguage();
  return (
    <div className="relative h-full w-1/5 shrink-0">
      <div className="chapter-curve absolute inset-0 overflow-hidden bg-ivory">
        <img
          src={IMG.hotelDusk}
          alt={t.common.hotelDuskAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-navy/10" />

        <div className="relative z-[1] flex h-full flex-col justify-between pl-[15%] pr-8 pb-28 pt-28 xl:pr-14">
          <div className="max-w-[36rem]">
            <p className="kicker flex items-center gap-3 text-white/90">
              <span className="inline-block h-0.5 w-8 bg-cyan" />
              {t.hotel.kicker}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-white xl:text-[2.85rem]">
              {t.hotel.title}
            </h2>
            <p className="mt-4 max-w-[32rem] text-[1.02rem] leading-relaxed text-white/90">
              {t.hotel.body}
            </p>
          </div>

          <div>
            <div className="mb-3">
              <span className="badge-illust bg-navy/80 text-white">{t.hotel.illustrativeData}</span>
            </div>
            <div className="grid max-w-[44rem] grid-cols-3 gap-3">
              {ILLUSTRATIVE_METRICS.map((m, i) => {
                const Icon = [IconBolt, IconDrop, IconRecycle][i];
                return (
                  <div key={m.id} className="metric-glass rounded-2xl px-5 py-5 text-white">
                    <Icon className="h-6 w-6 text-cyan" />
                    <p className="mt-4 text-[0.85rem] text-white/70">{t.metrics[i]}</p>
                    <p className="font-display text-[1.85rem] leading-none">
                      {m.value} <span className="text-[1.05rem] font-semibold">{m.unit}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterDocuments() {
  const { t } = useLanguage();
  return (
    <div className="relative h-full w-1/5 shrink-0">
      <div className="chapter-curve absolute inset-0 overflow-hidden bg-cream">
        <div className="flex h-full flex-col pl-[15%] pr-8 pb-28 pt-28 xl:pr-14">
          <div className="max-w-[40rem]">
            <p className="kicker flex items-center gap-3 text-ink/55">
              <span className="inline-block h-0.5 w-8 bg-cyan" />
              {t.flow.kicker}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink xl:text-[2.75rem]">
              {t.flow.title}
            </h2>
            <p className="mt-4 max-w-[36rem] text-[1.02rem] leading-relaxed text-ink/75">
              {t.flow.body}
            </p>
          </div>

          <div className="mt-8 flex-1">
            <DocumentFlow layout="wide" />
          </div>

          <ProcessSteps className="mt-auto hidden max-w-4xl lg:grid" compact highlight={1} />
        </div>
      </div>
    </div>
  );
}

function ChapterJourney() {
  return (
    <div className="relative h-full w-1/5 shrink-0">
      <div className="journey-chapter-curve absolute inset-0 overflow-hidden bg-navy">
        <div className="relative z-[1] h-full">
          <JourneyPanels />
        </div>
      </div>
    </div>
  );
}

function ChapterProduct() {
  const { t } = useLanguage();
  return (
    <div className="relative h-full w-1/5 shrink-0" id="produto-hero">
      <div className="chapter-curve absolute inset-0 overflow-hidden bg-ivory">
        <img
          src={IMG.hotelPoolDay}
          alt={t.common.hotelPoolAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/20" />

        <div className="relative z-[1] flex h-full flex-col justify-center pl-[15%] pr-8 pb-24 pt-24 xl:pr-14">
          <div className="mb-4 max-w-xl">
            <p className="kicker flex items-center gap-3 text-white/90">
              <span className="inline-block h-0.5 w-8 bg-cyan" />
              {t.product.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl text-white xl:text-4xl">{t.product.title}</h2>
            <p className="mt-2 text-sm text-white/90">
              {t.product.body}
            </p>
          </div>
          <Dashboard className="max-w-[640px] origin-top-left scale-[0.92] xl:scale-100" />
        </div>
      </div>
    </div>
  );
}

function MobileNarrative({ onHow }: { onHow: () => void }) {
  const { t } = useLanguage();
  return (
    <div>
      <div className="relative min-h-[100svh] overflow-hidden">
        <img
          src={IMG.forestRoad}
          alt={t.common.forestAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="forest-shade absolute inset-0" />
        <Header theme="dark" />
        <div className="relative z-10">
          <LeftColumn onHow={onHow} compact />
        </div>
      </div>

      <section id="paisagem" className="bg-forest px-5 py-16 text-white">
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.id}>
              <p className="font-display text-5xl">{s.num}</p>
              <p className="mt-2 font-extrabold uppercase tracking-[0.14em]">{t.stepNames[i]}</p>
              <span className="mt-2 block h-0.5 w-8 bg-cyan" />
              <p className="mt-3 text-white/75">{t.stepTexts[i]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="hotelaria" className="relative overflow-hidden">
        <img src={IMG.hotelDusk} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/35" />
        <div className="relative px-5 py-16 text-white">
          <p className="kicker flex items-center gap-3 text-white/70">
            <span className="inline-block h-0.5 w-8 bg-cyan" />
            {t.hotel.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight">{t.hotel.title}</h2>
          <p className="mt-3 max-w-xl text-white/80">
            {t.hotel.body}
          </p>
          <p className="mt-6 text-xs text-white/60">{t.hotel.illustrativeData}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {ILLUSTRATIVE_METRICS.map((m, i) => {
              const Icon = [IconBolt, IconDrop, IconRecycle][i];
              return (
                <div key={m.id} className="metric-glass rounded-2xl p-5">
                  <Icon className="h-6 w-6 text-cyan" />
                  <p className="mt-3 text-sm text-white/70">{t.metrics[i]}</p>
                  <p className="font-display text-2xl">
                    {m.value} {m.unit}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="documentos" className="bg-cream px-5 py-16">
        <p className="kicker flex items-center gap-3 text-ink/55">
          <span className="inline-block h-0.5 w-8 bg-cyan" />
          {t.flow.kicker}
        </p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-ink">
          {t.flow.title}
        </h2>
        <p className="mt-3 max-w-xl text-ink/75">
          {t.flow.body}
        </p>
        <div className="mt-10">
          <DocumentFlow />
        </div>
        <ProcessSteps className="mt-12" compact />
      </section>

      <section id="jornada-hero" className="bg-ivory px-5 py-16">
        <p className="kicker flex items-center gap-3 text-ink/55">
          <span className="inline-block h-0.5 w-8 bg-cyan" />
          {t.journey.kicker}
        </p>
        <h2 className="mt-4 font-display text-3xl text-ink">{t.journey.title}</h2>
        <ol className="mt-10 space-y-8">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex gap-4">
              <span className="font-display text-3xl text-cyan-deep">{s.num}</span>
              <div>
                <h3 className="font-bold text-ink">{t.stepNames[i]}</h3>
                <p className="mt-1 text-sm text-muted">{t.stepTexts[i]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="produto-hero" className="relative overflow-hidden bg-navy px-5 py-16">
        <p className="kicker flex items-center gap-3 text-white/60">
          <span className="inline-block h-0.5 w-8 bg-cyan" />
          {t.product.kicker}
        </p>
        <h2 className="mt-4 font-display text-3xl text-white">{t.product.title}</h2>
        <p className="mt-3 max-w-xl text-sm text-white/65">
          {t.product.body}
        </p>
        <div className="mt-8">
          <Dashboard />
        </div>
        <a href="#piloto" className="btn-primary mt-8">
          {t.ctaPilot}
          <IconArrow />
        </a>
      </section>

    </div>
  );
}
