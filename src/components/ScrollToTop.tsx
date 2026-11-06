import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

export function ScrollToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={t.common.backToTop}
      title={t.common.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="fixed bottom-5 right-5 z-[60] grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-forest text-cyan shadow-xl transition hover:-translate-y-0.5 hover:bg-forest-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan md:bottom-7 md:right-7"
    >
      <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
        <path d="M12 9v12" />
      </svg>
    </button>
  );
}
