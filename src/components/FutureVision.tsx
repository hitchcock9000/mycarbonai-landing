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
          <p className="text-sm font-medium text-white/85">{t.future.disclaimer}</p>
        </div>
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] lg:text-[2.75rem]">
          {t.future.title}
        </h2>
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/80">
          {t.future.body}
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {t.future.cards.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 transition-colors duration-200 hover:border-cyan/30 hover:bg-white/[0.07] lg:p-7"
              >
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                </div>
                <p className="mt-4 pl-[3.75rem] text-sm leading-relaxed text-white/80">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
