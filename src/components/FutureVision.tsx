import { IconBolt, IconChart, IconClipboard, IconLeaf } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";

const ICONS = [IconClipboard, IconLeaf, IconBolt, IconChart];

export function FutureVision() {
  const { t } = useLanguage();
  return (
    <section id="visao-produto" className="relative bg-navy py-24 text-white lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="vision-badge">{t.future.badge}</span>
          <p className="text-sm text-white/75">{t.future.disclaimer}</p>
        </div>
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] lg:text-[2.75rem]">
          {t.future.title}
        </h2>
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/70">
          {t.future.body}
        </p>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {t.future.cards.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-white/8 bg-white/4 p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white/45">
                    {t.future.cardBadge}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
