import { useLanguage } from "../i18n/LanguageProvider";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="scroll-mt-24 bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] overflow-hidden px-6 lg:px-10">
        <p className="kicker flex items-center gap-3 text-ink/60">
          <span className="inline-block h-0.5 w-8 bg-cyan" />
          {t.about.kicker}
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <h2 className="max-w-xl font-display text-4xl leading-[1.08] text-ink lg:text-[3rem]">
            {t.about.title}
          </h2>
          <div className="grid gap-7 sm:grid-cols-2">
            <p className="leading-relaxed text-ink/75">{t.about.story}</p>
            <div className="border-l-2 border-cyan pl-5">
              <h3 className="font-display text-xl leading-tight text-ink">{t.about.missionTitle}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{t.about.mission}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
