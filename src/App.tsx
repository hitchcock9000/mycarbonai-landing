import { useState } from "react";
import { ContactCTA } from "./components/ContactCTA";
import { Footer } from "./components/Footer";
import { FutureVision } from "./components/FutureVision";
import { Header } from "./components/Header";
import { HorizontalNarrative } from "./components/HorizontalNarrative";
import { HowItWorks } from "./components/HowItWorks";
import { PilotSection } from "./components/PilotSection";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { useLanguage } from "./i18n/LanguageProvider";
import { LegalPage } from "./components/LegalPage";
import { PrivacyConsent } from "./components/PrivacyConsent";
import { ScrollToTop } from "./components/ScrollToTop";

type PrivacyChoice = "allow" | "reject" | null;
const PRIVACY_CHOICE_KEY = "mc-websitecarbon-consent";

function readPrivacyChoice(): PrivacyChoice {
  try {
    const choice = localStorage.getItem(PRIVACY_CHOICE_KEY);
    return choice === "allow" || choice === "reject" ? choice : null;
  } catch {
    return null;
  }
}

function handleSiteNav(href: string) {
  const id = href.replace("#", "");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const [privacyChoice, setPrivacyChoice] = useState<PrivacyChoice>(readPrivacyChoice);
  const [privacyOpen, setPrivacyOpen] = useState(() => readPrivacyChoice() === null);
  const page = new URLSearchParams(window.location.search).get("page");
  const choosePrivacy = (allowWebsiteCarbon: boolean) => {
    const choice = allowWebsiteCarbon ? "allow" : "reject";
    setPrivacyChoice(choice);
    setPrivacyOpen(false);
    try {
      localStorage.setItem(PRIVACY_CHOICE_KEY, choice);
    } catch {
      // The choice remains active for this page view if browser storage is unavailable.
    }
  };

  if (page === "privacy" || page === "terms" || page === "imprint") {
    return <>
      <LegalPage kind={page} onPrivacySettings={() => setPrivacyOpen(true)} />
      <PrivacyConsent open={privacyOpen} onChoose={choosePrivacy} />
      <ScrollToTop />
    </>;
  }
  return (
    <div className="min-h-screen bg-forest text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink"
      >
        {t.common.skipContent}
      </a>
      <HorizontalNarrative />
      <main id="conteudo">
        <div className="sticky top-0 z-50">
          <Header theme="light" logoTheme="light" solid onNav={handleSiteNav} />
        </div>
        <HowItWorks />
        <PilotSection />
        <FutureVision />
        <ContactCTA />
      </main>
      <Footer carbonBadgeEnabled={privacyChoice === "allow"} onPrivacySettings={() => setPrivacyOpen(true)} />
      <PrivacyConsent open={privacyOpen} onChoose={choosePrivacy} />
      <ScrollToTop />
    </div>
  );
}
