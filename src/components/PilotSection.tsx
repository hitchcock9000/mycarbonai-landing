import { IMG } from "../assets/media";
import { PILOT_VALIDATES } from "../data/content";
import { IconCheck, IconFile, IconLink } from "./Icons";

const ICONS = [IconFile, IconCheck, IconLink];

export function PilotSection() {
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
          O piloto
        </p>
        <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.1] text-ink lg:text-[2.75rem]">
          O que o piloto valida.
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
          O piloto de design parceiro serve para testar, com hotéis reais, se esta forma de organizar
          informação ambiental é útil no dia a dia da operação. Não é um produto acabado.
        </p>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {PILOT_VALIDATES.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item.title} className="rounded-2xl border border-black/6 bg-white p-7 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan/15 text-cyan-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
