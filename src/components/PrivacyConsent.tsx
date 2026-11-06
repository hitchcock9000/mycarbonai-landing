import { useLanguage } from "../i18n/LanguageProvider";

type PrivacyConsentProps = {
  open: boolean;
  onChoose: (allowWebsiteCarbon: boolean) => void;
};

export function PrivacyConsent({ open, onChoose }: PrivacyConsentProps) {
  const { t } = useLanguage();
  if (!open) return null;

  return (
    <section
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl rounded-2xl border border-white/15 bg-forest p-5 text-white shadow-2xl md:inset-x-6 md:bottom-6 md:p-6"
      role="region"
    >
      <h2 id="privacy-consent-title" className="font-display text-lg font-bold">{t.privacyOptions.title}</h2>
      <p id="privacy-consent-description" className="mt-2 text-sm leading-relaxed text-white/75">
        {t.privacyOptions.body} <a href="/?page=privacy" className="font-semibold text-cyan underline underline-offset-2">{t.footer.privacy}</a>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="btn-primary btn-sm" onClick={() => onChoose(true)}>{t.privacyOptions.allow}</button>
        <button type="button" className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan" onClick={() => onChoose(false)}>{t.privacyOptions.reject}</button>
      </div>
    </section>
  );
}
