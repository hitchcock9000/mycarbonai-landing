import { useCallback, useEffect, useRef } from "react";
import { IMG } from "../assets/media";
import { CHAPTERS, COPY, ILLUSTRATIVE_METRICS, STEPS } from "../data/content";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { ChapterNav } from "./ChapterNav";
import { Dashboard } from "./Dashboard";
import { DocumentFlow } from "./DocumentFlow";
import { Header } from "./Header";
import { IconArrow, IconBolt, IconDrop, IconPlay, IconRecycle } from "./Icons";
import { JourneyPanels } from "./JourneyPanels";
import { LeftColumn } from "./LeftColumn";
import { ProcessSteps } from "./ProcessSteps";

const COUNT = CHAPTERS.length;

type Props = {
  onChapter?: (index: number) => void;
};

export function HorizontalNarrative({ onChapter }: Props) {
  const pinRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
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
        const mobileIds = ["paisagem", "hotelaria", "documentos", "jornada", "produto-preview"];
        document.getElementById(mobileIds[next] ?? CHAPTERS[next].id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }
      const start = el.offsetTop;
      const total = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: start + (next / (COUNT - 1)) * total, behavior: "smooth" });
    },
    [pinned],
  );

  const onHow = () => goTo(2);

  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      const el = pinRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.5;
      if (!inside) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(clampedActive + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(clampedActive - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned, clampedActive, goTo]);

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

  const handleNav = useCallback(
    (href: string) => {
      if (href === "#produto") goTo(4);
      else if (href === "#como-funciona") goTo(2);
      else if (href === "#hotelaria") goTo(1);
      else if (href === "#sobre") document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
      else if (href === "#piloto") document.getElementById("piloto")?.scrollIntoView({ behavior: "smooth" });
    },
    [goTo],
  );

  useEffect(() => {
    const onCustom = (e: Event) => {
      const href = (e as CustomEvent<string>).detail;
      if (href) handleNav(href);
    };
    window.addEventListener("mc-nav", onCustom as EventListener);
    return () => window.removeEventListener("mc-nav", onCustom as EventListener);
  }, [handleNav]);

  const headerTheme: "light" | "dark" = clampedActive === 0 || clampedActive === 3 ? "dark" : "light";
  const navTheme: "light" | "dark" = headerTheme;

  if (!pinned) {
    return (
      <section ref={pinRef} id="topo" className="bg-forest">
        <MobileNarrative onHow={onHow} onNav={handleNav} />
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
      style={{ height: `${COUNT * 100}vh` }}
      aria-label="Narrativa MyCarbonAI"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-forest">
        <div className="grain vignette absolute inset-0">
          <img
            src={IMG.forestRoad}
            alt="Floresta vista de cima, atravessada por uma estrada sinuosa"
            className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
            style={{
              transform: `translate3d(${forestShift}%, 0, 0) scale(${forestScale})`,
              transformOrigin: "30% 50%",
            }}
          />
          <div className="forest-shade absolute inset-0" />
        </div>

        {headerTheme === "dark" && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-black/45 to-transparent" />
        )}
        <Header
          theme={headerTheme}
          logoTheme="dark"
          onNav={handleNav}
          activeId={["", "hotelaria", "como-funciona", "", "produto"][clampedActive]}
        />

        <div className="relative z-10 flex h-full">
          <div className="relative z-20 w-[40%] max-w-[36rem] shrink-0 xl:w-[42%]">
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
              Capítulo {clampedActive + 1} de {COUNT}: {CHAPTERS[clampedActive].label}
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
  return (
    <div className="relative h-full w-1/5 shrink-0" id="paisagem-desktop">
      <div className="absolute inset-0 flex items-end justify-end p-10 pb-28">
        <ol className="grid w-full max-w-[36rem] grid-cols-3 gap-6 text-white">
          {STEPS.slice(0, 3).map((s) => (
            <li key={s.id}>
              <p className="font-display text-5xl leading-none text-white/95 xl:text-6xl">{s.num}</p>
              <p className="mt-2 text-[0.95rem] font-extrabold uppercase tracking-[0.14em]">{s.title}</p>
              <span className="mt-2 block h-0.5 w-8 bg-cyan" />
              <p className="mt-3 text-[0.88rem] leading-snug text-white/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ChapterHotel() {
  return (
    <div className="relative h-full w-1/5 shrink-0">
      <div className="chapter-curve absolute inset-0 overflow-hidden bg-ivory">
        <img
          src={IMG.hotelDusk}
          alt="Hotel contemporâneo ao entardecer, com piscina e espreguiçadeiras"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-black/10" />

        <div className="relative z-[1] flex h-full flex-col justify-between px-12 pb-28 pt-28 xl:px-16">
          <div className="max-w-[36rem]">
            <p className="kicker flex items-center gap-3 text-ink/55">
              <span className="inline-block h-0.5 w-8 bg-cyan" />
              Hotelaria
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink xl:text-[2.85rem]">
              Sustentabilidade com impacto na operação.
            </h2>
            <p className="mt-4 max-w-[32rem] text-[1.02rem] leading-relaxed text-ink/75">
              Transforme dados operacionais em decisões ambientais que fazem sentido para o seu hotel.
            </p>
          </div>

          <div>
            <div className="mb-3">
              <span className="badge-illust bg-white/70 text-ink/60">Dados ilustrativos</span>
            </div>
            <div className="grid max-w-[44rem] grid-cols-3 gap-3">
              {ILLUSTRATIVE_METRICS.map((m, i) => {
                const Icon = [IconBolt, IconDrop, IconRecycle][i];
                return (
                  <div key={m.id} className="metric-glass rounded-2xl px-5 py-5 text-white">
                    <Icon className="h-6 w-6 text-cyan" />
                    <p className="mt-4 text-[0.85rem] text-white/70">{m.label}</p>
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
  return (
    <div className="relative h-full w-1/5 shrink-0">
      <div className="chapter-curve absolute inset-0 overflow-hidden bg-cream">
        <div className="flex h-full flex-col px-12 pb-28 pt-28 xl:px-16">
          <div className="max-w-[40rem]">
            <p className="kicker flex items-center gap-3 text-ink/55">
              <span className="inline-block h-0.5 w-8 bg-cyan" />
              Como funciona
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink xl:text-[2.75rem]">
              De documentos à informação pronta a explorar.
            </h2>
            <p className="mt-4 max-w-[36rem] text-[1.02rem] leading-relaxed text-ink/75">
              Partimos dos documentos da sua operação, organizamos os dados e revemos a informação,
              mantendo sempre a ligação à sua origem.
            </p>
          </div>

          <div className="mt-8 flex-1">
            <DocumentFlow />
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
      <div className="chapter-curve absolute inset-0 overflow-hidden bg-navy">
        <JourneyPanels />
      </div>
    </div>
  );
}

function ChapterProduct() {
  return (
    <div className="relative h-full w-1/5 shrink-0" id="produto-desktop">
      <div className="chapter-curve absolute inset-0 overflow-hidden bg-ivory">
        <img
          src={IMG.hotelPoolDay}
          alt="Piscina de hotel com espreguiçadeiras e edifício contemporâneo"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/50 via-white/10 to-transparent" />

        <div className="relative z-[1] flex h-full flex-col justify-center px-10 pb-24 pt-24 xl:px-14">
          <div className="mb-4 max-w-xl">
            <p className="kicker flex items-center gap-3 text-ink/70">
              <span className="inline-block h-0.5 w-8 bg-cyan" />
              Produto
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink xl:text-4xl">Uma base organizada para a operação.</h2>
            <p className="mt-2 text-sm text-ink/70">
              Pré-visualização ilustrativa. As capacidades em validação no piloto estão no painel;
              ideias futuras estão identificadas mais abaixo.
            </p>
          </div>
          <Dashboard className="max-w-[640px] origin-top-left scale-[0.92] xl:scale-100" />
        </div>
      </div>
    </div>
  );
}

function MobileNarrative({
  onHow,
  onNav,
}: {
  onHow: () => void;
  onNav: (href: string) => void;
}) {
  return (
    <div>
      <div className="relative min-h-[100svh] overflow-hidden">
        <img
          src={IMG.forestRoad}
          alt="Floresta vista de cima, atravessada por uma estrada sinuosa"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="forest-shade absolute inset-0" />
        <Header theme="dark" onNav={onNav} />
        <div className="relative z-10">
          <LeftColumn onHow={onHow} compact />
        </div>
      </div>

      <section id="paisagem" className="bg-forest px-5 py-16 text-white">
        <ol className="grid gap-10 sm:grid-cols-3">
          {STEPS.slice(0, 3).map((s) => (
            <li key={s.id}>
              <p className="font-display text-5xl">{s.num}</p>
              <p className="mt-2 font-extrabold uppercase tracking-[0.14em]">{s.title}</p>
              <span className="mt-2 block h-0.5 w-8 bg-cyan" />
              <p className="mt-3 text-white/75">{s.text}</p>
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
            Hotelaria
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight">Sustentabilidade com impacto na operação.</h2>
          <p className="mt-3 max-w-xl text-white/80">
            Transforme dados operacionais em decisões ambientais que fazem sentido para o seu hotel.
          </p>
          <p className="mt-6 text-xs text-white/60">Dados ilustrativos</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {ILLUSTRATIVE_METRICS.map((m, i) => {
              const Icon = [IconBolt, IconDrop, IconRecycle][i];
              return (
                <div key={m.id} className="metric-glass rounded-2xl p-5">
                  <Icon className="h-6 w-6 text-cyan" />
                  <p className="mt-3 text-sm text-white/70">{m.label}</p>
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
          Como funciona
        </p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-ink">
          De documentos à informação pronta a explorar.
        </h2>
        <p className="mt-3 max-w-xl text-ink/75">
          Partimos dos documentos da sua operação, organizamos os dados e revemos a informação,
          mantendo sempre a ligação à sua origem.
        </p>
        <div className="mt-10">
          <DocumentFlow />
        </div>
        <ProcessSteps className="mt-12" compact />
      </section>

      <section id="jornada" className="bg-ivory px-5 py-16">
        <p className="kicker flex items-center gap-3 text-ink/55">
          <span className="inline-block h-0.5 w-8 bg-cyan" />
          Jornada ambiental
        </p>
        <h2 className="mt-4 font-display text-3xl text-ink">Cinco passos, uma sequência.</h2>
        <ol className="mt-10 space-y-8">
          {STEPS.map((s) => (
            <li key={s.id} className="flex gap-4">
              <span className="font-display text-3xl text-cyan-deep">{s.num}</span>
              <div>
                <h3 className="font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="produto-preview" className="relative overflow-hidden bg-navy px-5 py-16">
        <p className="kicker flex items-center gap-3 text-white/60">
          <span className="inline-block h-0.5 w-8 bg-cyan" />
          Produto
        </p>
        <h2 className="mt-4 font-display text-3xl text-white">Uma base organizada para a operação.</h2>
        <p className="mt-3 max-w-xl text-sm text-white/65">
          Pré-visualização ilustrativa. Capacidades em validação no piloto — ideias futuras estão identificadas mais abaixo.
        </p>
        <div className="mt-8">
          <Dashboard />
        </div>
        <a href="#piloto" className="btn-primary mt-8">
          {COPY.ctaPilot}
          <IconArrow />
        </a>
      </section>

      <button type="button" onClick={onHow} className="sr-only">
        <IconPlay />
      </button>
    </div>
  );
}
