import { FUTURE_VISION } from "../data/content";
import { IconBolt, IconChart, IconClipboard, IconLeaf } from "./Icons";

const ICONS = [IconClipboard, IconLeaf, IconBolt, IconChart];

export function FutureVision() {
  return (
    <section id="produto" className="relative bg-navy py-24 text-white lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="vision-badge">Visão do produto</span>
          <p className="text-sm text-white/55">Não disponível no piloto. Ideias em exploração.</p>
        </div>
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] lg:text-[2.75rem]">
          Para onde o produto pode crescer.
        </h2>
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/70">
          Depois de a informação estar organizada e ligada à origem, estas são direções que
          queremos explorar com os hotéis parceiros. Não fazem parte do que o piloto valida hoje.
        </p>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {FUTURE_VISION.map((item, i) => {
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
                    Visão do produto
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
