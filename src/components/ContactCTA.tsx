import { useState, type FormEvent } from "react";
import { IMG } from "../assets/media";
import { IconArrow } from "./Icons";
import { useLanguage } from "../i18n/LanguageProvider";
import { buildMailtoFallback, submitEvaluationRequest, type EvaluationRequest } from "../lib/evaluation-request";

type SubmissionState =
  | { kind: "sent" }
  | { kind: "email"; href: string }
  | null;

export function ContactCTA() {
  const { t, language } = useLanguage();
  const copy = t.contact;
  const [submission, setSubmission] = useState<SubmissionState>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const formData = new FormData(e.currentTarget);
    const values: EvaluationRequest = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      request: String(formData.get("request") || ""),
      context: String(formData.get("context") || "").trim(),
      website: String(formData.get("website") || ""),
      locale: language,
    };

    setSubmitting(true);
    const result = await submitEvaluationRequest(values);
    setSubmitting(false);

    if (result.ok) {
      setSubmission({ kind: "sent" });
      return;
    }

    setSubmission({ kind: "email", href: buildMailtoFallback(values) });
  };

  return (
    <section id="piloto" className="relative overflow-hidden bg-forest py-24 text-white lg:py-32">
      <img
        src={IMG.leavesOverlay}
        alt=""
        className="pointer-events-none absolute -right-8 top-0 hidden h-72 w-auto opacity-70 lg:block"
      />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 overflow-hidden px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
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

        <div className="min-w-0 max-w-full overflow-hidden rounded-3xl bg-ivory p-7 text-ink shadow-2xl md:p-9">
          {submission ? (
            <div>
              <p className="kicker text-ink/50" role="status">{submission.kind === "sent" ? copy.thanks : copy.emailFallbackTitle}</p>
              <h3 className="mt-3 font-display text-2xl">{submission.kind === "sent" ? copy.received : copy.emailFallbackBody}</h3>
              {submission.kind === "sent" ? (
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/75">{copy.response}</p>
              ) : (
                <a href={submission.href} className="btn-primary mt-5">
                  {copy.emailFallbackAction}
                  <IconArrow />
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="font-display text-2xl">{copy.formTitle}</h3>
              <p className="text-sm text-muted">{copy.formIntro}</p>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{copy.name}</span>
                <input className="input" name="name" autoComplete="name" maxLength={200} required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{copy.email}</span>
                <input className="input" name="email" type="email" autoComplete="email" maxLength={320} required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{copy.hotel}</span>
                <input className="input" name="company" autoComplete="organization" maxLength={200} required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{copy.request}</span>
                <select className="input" name="request" defaultValue="" required>
                  <option value="" disabled>{copy.select}</option>
                  {copy.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">
                  {copy.context} <span className="font-normal text-muted">{copy.optional}</span>
                </span>
                <textarea className="input min-h-[6.5rem] resize-y" name="context" rows={4} maxLength={5000} />
              </label>

              <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? copy.sending : copy.submit}
                {!submitting && <IconArrow />}
              </button>
              <p className="text-[0.72rem] leading-relaxed text-muted">
                {copy.privacy} <a href="/?page=privacy" className="font-semibold text-ink underline underline-offset-2">{t.footer.privacy}</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
