import { useEffect, useId, useRef, useState } from "react";
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
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const light = theme === "light";
  const logoLight = (logoTheme ?? theme) === "light";

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const onViewportChange = () => {
      if (media.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    media.addEventListener("change", onViewportChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      media.removeEventListener("change", onViewportChange);
    };
  }, [open]);

  const handle = (href: string) => {
    setOpen(false);
    onNav?.(href);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-50",
        solid
          ? "pointer-events-auto sticky top-0 bg-ivory/90 backdrop-blur-md"
          : cn(
              "pointer-events-none absolute inset-x-0 top-0 transition-colors",
              open && "bg-forest/95 backdrop-blur-md",
            ),
      )}
    >
      <div className="pointer-events-auto mx-auto flex h-[4.6rem] max-w-[1440px] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-5 md:h-[5.1rem] md:px-8 lg:px-10">
        <Logo
          wordmarkClassName={cn("text-[1.15rem] min-[375px]:text-[1.35rem]", logoLight ? "text-ink" : "text-white")}
          markClassName="text-cyan"
          className="min-w-0 shrink-0"
        />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-9" aria-label={t.common.navLabel}>
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

        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <div className={cn("flex shrink-0 items-center rounded-full border p-0.5 text-[0.68rem] font-bold", light ? "border-ink/15" : "border-white/20")} role="group" aria-label={t.language}>
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
          <a href="/piloto" className="btn-primary btn-sm hidden max-w-full shrink-0 lg:inline-flex" onClick={() => setOpen(false)}>
            {t.ctaPilot}
            <IconArrow />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors lg:hidden",
              light
                ? "border-ink/15 text-ink hover:bg-ink/5"
                : "border-white/20 bg-forest/35 text-white hover:bg-white/10",
            )}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id={menuId}
          className="pointer-events-auto max-h-[calc(100svh-4.6rem)] overflow-y-auto border-t border-white/10 bg-forest/95 px-5 py-5 shadow-2xl backdrop-blur-md lg:hidden"
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
                aria-current={activeId === item.id ? "location" : undefined}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white active:bg-white/15",
                  activeId === item.id && "bg-white/10 text-cyan",
                )}
              >
                {t.nav[index]}
              </a>
            ))}
            <a
              href="/piloto"
              className="btn-primary mt-3 w-full"
              onClick={(e) => {
                if (onNav) {
                  e.preventDefault();
                  handle("/piloto");
                } else {
                  setOpen(false);
                }
              }}
            >
              {t.ctaPilot}
              <IconArrow />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
