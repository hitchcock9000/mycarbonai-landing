import { useEffect, useState } from "react";
import { ContactCTA } from "./components/ContactCTA";
import { AboutSection } from "./components/AboutSection";
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

const SECTION_ROUTES: Record<string, string> = {
  "/": "topo",
  "/hotelaria": "hotelaria",
  "/como-funciona": "como-funciona",
  "/jornada": "jornada",
  "/produto": "produto",
  "/sobre": "sobre",
  "/piloto": "piloto",
};
const SECTION_PATHS = Object.fromEntries(Object.entries(SECTION_ROUTES).map(([path, id]) => [id, path]));

function scrollToRoute(path: string, behavior: ScrollBehavior = "smooth") {
  const id = SECTION_ROUTES[path];
  if (!id || id === "topo") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

function handleSiteNav(href: string) {
  const target = new URL(href, window.location.origin);
  const path = target.pathname;
  if (!SECTION_ROUTES[path]) return;
  if (window.location.pathname !== path || window.location.search) {
    window.history.pushState({}, "", path);
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollToRoute(path, reducedMotion ? "auto" : "smooth");
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

  useEffect(() => {
    if (page) return;
    const legacyHash = window.location.hash.slice(1);
    if (legacyHash && SECTION_PATHS[legacyHash]) {
      const cleanPath = SECTION_PATHS[legacyHash];
      window.history.replaceState({}, "", cleanPath);
      requestAnimationFrame(() => scrollToRoute(cleanPath, "auto"));
    }
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    if (!legacyHash && currentPath !== "/" && SECTION_ROUTES[currentPath]) {
      requestAnimationFrame(() => scrollToRoute(currentPath, "auto"));
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !SECTION_ROUTES[url.pathname]) return;
      event.preventDefault();
      handleSiteNav(url.pathname);
    };
    const onPopState = () => {
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      scrollToRoute(path, "auto");
    };
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, [page]);
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
        <AboutSection />
        <ContactCTA />
      </main>
      <Footer carbonBadgeEnabled={privacyChoice === "allow"} onPrivacySettings={() => setPrivacyOpen(true)} />
      <PrivacyConsent open={privacyOpen} onChoose={choosePrivacy} />
      <ScrollToTop />
    </div>
  );
}
