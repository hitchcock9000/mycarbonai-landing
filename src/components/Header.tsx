import { useState } from "react";
import { Logo } from "./Logo";
import { IconArrow, IconClose, IconMenu } from "./Icons";
import { NAV } from "../data/content";
import { cn } from "../utils/cn";
import { useLanguage } from "../i18n/LanguageProvider";

type HeaderProps = {
  theme?: "light" | "dark";
  logoTheme?: "light" | "dark";
  activeId?: string;
  onNav?: (href: string) => void;
  solid?: boolean;
};

export function Header({
  theme = "dark",
  logoTheme,
  activeId,
  onNav,
  solid = false,
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const light = theme === "light";
  const logoLight = (logoTheme ?? theme) === "light";

  const handle = (href: string) => {
    setOpen(false);
    onNav?.(href);
  };

  return (
    <header
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-50",
        solid && "pointer-events-auto sticky top-0 bg-ivory/90 backdrop-blur-md",
      )}
    >
      <div className="pointer-events-auto mx-auto flex h-[4.6rem] max-w-[1440px] items-center justify-between px-5 md:h-[5.1rem] md:px-8 lg:px-10">
        <Logo
          wordmarkClassName={logoLight ? "text-ink" : "text-white"}
          markClassName="text-cyan"
        />

        <nav className="hidden items-center gap-9 lg:flex" aria-label={t.common.navLabel}>
          {NAV.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                if (onNav) {
                  e.preventDefault();
                  handle(item.href);
                } else {
                  setOpen(false);
                }
              }}
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "nav-link",
                light ? "text-ink/80 hover:text-ink" : "text-white/90 hover:text-white",
                activeId === item.id && "is-active",
              )}
            >
              {t.nav[index]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className={cn("flex items-center rounded-full border p-0.5 text-[0.68rem] font-bold", light ? "border-ink/15" : "border-white/20")} role="group" aria-label={t.language}>
            {(["pt", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={language === code}
                aria-label={code === "pt" ? t.switchToPortuguese : t.switchToEnglish}
                onClick={() => setLanguage(code)}
                className={cn(
                  "min-w-8 rounded-full px-2 py-1 transition-colors",
                  language === code
                    ? "bg-cyan text-ink"
                    : light ? "text-ink/70 hover:bg-ink/5" : "text-white/75 hover:bg-white/10",
                )}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#piloto" className="btn-primary btn-sm hidden sm:inline-flex" onClick={() => setOpen(false)}>
            {t.ctaPilot}
            <IconArrow />
          </a>
          <button
            type="button"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full lg:hidden",
              light ? "text-ink" : "text-white",
            )}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="pointer-events-auto border-t border-white/10 bg-forest/95 px-5 py-5 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label={t.common.mobileNavLabel}>
          {NAV.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (onNav) {
                    e.preventDefault();
                    handle(item.href);
                  } else {
                    setOpen(false);
                  }
                }}
                className="rounded-lg px-3 py-3 text-base font-semibold text-white"
              >
                {t.nav[index]}
              </a>
            ))}
            <a href="#piloto" className="btn-primary mt-3" onClick={() => setOpen(false)}>
              {t.ctaPilot}
              <IconArrow />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
