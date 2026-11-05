import { ContactCTA } from "./components/ContactCTA";
import { Footer } from "./components/Footer";
import { FutureVision } from "./components/FutureVision";
import { Header } from "./components/Header";
import { HorizontalNarrative } from "./components/HorizontalNarrative";
import { HowItWorks } from "./components/HowItWorks";
import { PilotSection } from "./components/PilotSection";

function handleSiteNav(href: string) {
  if (href === "#hotelaria" || href === "#topo") {
    window.dispatchEvent(new CustomEvent("mc-nav", { detail: href === "#topo" ? "#hotelaria" : href }));
    if (href === "#topo") {
      document.getElementById("topo")?.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  return (
    <div className="min-h-screen bg-forest text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink"
      >
        Saltar para o conteúdo
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
      <Footer />
    </div>
  );
}
