import { FormEvent, useState } from "react";
import { IMG } from "../assets/media";
import { COPY } from "../data/content";
import { IconArrow } from "./Icons";

export function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 600);
  };

  return (
    <section id="piloto" className="relative overflow-hidden bg-forest py-24 text-white lg:py-32">
      <img
        src={IMG.leavesOverlay}
        alt=""
        className="pointer-events-none absolute -right-8 top-0 hidden h-72 w-auto opacity-70 lg:block"
      />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div>
          <p className="kicker flex items-center gap-3 text-white/60">
            <span className="inline-block h-0.5 w-8 bg-cyan" />
            Piloto de design parceiro
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] lg:text-[2.75rem]">
            Conversamos com hotéis que queiram explorar um piloto.
          </h2>
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/75">
            O piloto serve para organizar informação operacional — energia, água, resíduos e
            fornecedores — e perceber, em conjunto, se esta base é útil. Sem compromisso de
            resultados ambientais.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-white/70">
            <li>— Pensado para equipas de hotelaria, manutenção e sustentabilidade.</li>
            <li>— Começa pelos documentos que o hotel já tem.</li>
            <li>— Os valores de exemplo nesta página são ilustrativos.</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-ivory p-7 text-ink shadow-2xl md:p-9">
          {sent ? (
            <div>
              <p className="kicker text-ink/50">Obrigado</p>
              <h3 className="mt-3 font-display text-2xl">Recebemos o pedido.</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/75">
                Vamos ler a mensagem e responder para o email indicado, para perceber se faz
                sentido avançar com uma conversa sobre o piloto.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="font-display text-2xl">Pedir uma conversa</h3>
              <p className="text-sm text-muted">Só pedimos o necessário para o contactar.</p>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Nome</span>
                <input className="input" name="nome" autoComplete="name" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Email de trabalho</span>
                <input className="input" name="email" type="email" autoComplete="email" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Hotel ou grupo</span>
                <input className="input" name="hotel" autoComplete="organization" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">
                  Mensagem <span className="font-normal text-muted">(opcional)</span>
                </span>
                <textarea className="input min-h-[6.5rem] resize-y" name="mensagem" rows={4} />
              </label>

              <button type="submit" className="btn-primary w-full" disabled={sending}>
                {sending ? "A enviar…" : COPY.ctaPilot}
                <IconArrow />
              </button>
              <p className="text-[0.72rem] leading-relaxed text-muted">
                Usamos estes dados apenas para responder ao pedido de conversa sobre o piloto.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
