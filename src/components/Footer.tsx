import { Logo } from "./Logo";
import { NAV } from "../data/content";
import { useLanguage } from "../i18n/LanguageProvider";
import { WebsiteCarbonBadge } from "./WebsiteCarbonBadge";

type FooterProps = {
  carbonBadgeEnabled: boolean;
  onPrivacySettings: () => void;
};

export function Footer({ carbonBadgeEnabled, onPrivacySettings }: FooterProps) {
  const { t } = useLanguage();
  return (
    <footer className="bg-forest-2 py-16 text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <Logo showTagline tagline={t.footer.tagline} taglineClassName="text-white/65" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65">
            {t.footer.description}
          </p>
          <WebsiteCarbonBadge enabled={carbonBadgeEnabled} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{t.footer.navigate}</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((n, i) => (
                <li key={n.id}>
                  <a
                    href={n.href}
                    className="text-sm text-white/80 hover:text-cyan"
                  >
                    {t.nav[i]}
                  </a>
                </li>
              ))}
              <li>
                <a href="/piloto" className="text-sm text-white/80 hover:text-cyan">
                  {t.ctaPilot}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{t.footer.note}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {t.footer.noteBody}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 text-xs text-white/40 lg:px-10">
        <p>© {new Date().getFullYear()} MyCarbonAI</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="/?page=privacy" className="text-white/70 hover:text-cyan">{t.footer.privacy}</a>
          <a href="/?page=terms" className="text-white/70 hover:text-cyan">{t.footer.terms}</a>
          <a href="/?page=imprint" className="text-white/70 hover:text-cyan">{t.footer.imprint}</a>
          <button type="button" onClick={onPrivacySettings} className="text-left text-white/70 underline-offset-2 hover:text-cyan hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">{t.privacyOptions.settings}</button>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
