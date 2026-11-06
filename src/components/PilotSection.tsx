import { IMG } from "../assets/media";
import { IconCheck, IconFile, IconLink } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";

const ICONS = [IconFile, IconCheck, IconLink];

export function PilotSection() {
  const { t } = useLanguage();
  return (
    <section id="piloto-valida" className="relative overflow-hidden bg-ivory py-24 lg:py-32">
      <img
        src={IMG.forestCanopy}
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[42%] object-cover opacity-90 lg:block"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-r from-ivory via-ivory/70 to-transparent lg:block" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="kicker flex items-center gap-3 text-ink/55">
          <span className="inline-block h-0.5 w-8 bg-cyan" />
          {t.pilot.kicker}
        </p>
        <h2 id="produto" className="mt-5 max-w-xl scroll-mt-24 font-display text-4xl leading-[1.1] text-ink lg:text-[2.75rem]">
          {t.pilot.title}
        </h2>
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink/75">
          {t.pilot.body}
        </p>

        <p className="mt-5 max-w-3xl rounded-xl border border-cyan-deep/20 bg-white/85 px-4 py-3 text-sm leading-relaxed text-ink/80 shadow-sm">
          {t.pilot.scope}
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {t.pilot.cards.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item.title} className="rounded-2xl border border-black/6 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-deep/30 hover:shadow-md lg:p-7">
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-cyan/15 text-cyan-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
