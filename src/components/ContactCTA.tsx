import { FormEvent, useState } from "react";
import { IMG } from "../assets/media";
import { IconArrow } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";

export function ContactCTA() {
  const { t } = useLanguage();
  const copy = t.contact;
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
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
            {copy.kicker}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] lg:text-[2.75rem]">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/75">
            {copy.body}
          </p>
          <ul className="mt-8 space-y-2 text-sm text-white/70">
            {copy.bullets.map((bullet) => <li key={bullet}>— {bullet}</li>)}
          </ul>
        </div>

        <div className="rounded-3xl bg-ivory p-7 text-ink shadow-2xl md:p-9">
          {sent ? (
            <div>
              <p className="kicker text-ink/50">{copy.thanks}</p>
              <h3 className="mt-3 font-display text-2xl">{copy.received}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/75">{copy.response}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="font-display text-2xl">{copy.formTitle}</h3>
              <p className="text-sm text-muted">{copy.formIntro}</p>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{copy.name}</span>
                <input className="input" name="nome" autoComplete="name" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{copy.email}</span>
                <input className="input" name="email" type="email" autoComplete="email" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{copy.hotel}</span>
                <input className="input" name="hotel" autoComplete="organization" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">
                  {copy.message} <span className="font-normal text-muted">{copy.optional}</span>
                </span>
                <textarea className="input min-h-[6.5rem] resize-y" name="mensagem" rows={4} />
              </label>

              <button type="submit" className="btn-primary w-full">
                {copy.previewSubmit}
                <IconArrow />
              </button>
              <p className="text-[0.72rem] leading-relaxed text-muted">
                {copy.privacy} <a href="/?page=privacy" className="font-semibold text-ink underline underline-offset-2">{t.footer.privacy}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
