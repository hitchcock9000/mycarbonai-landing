import { cn } from "../utils/cn";

type IconProps = { className?: string };

export function IconBolt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDrop({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path
        d="M12 3c3.5 5 7 8.6 7 12.2A7 7 0 1 1 5 15.2C5 11.6 8.5 8 12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconRecycle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path
        d="M7 8.5 9.5 4h5L17 8.5M17 8.5h3.2M17 8.5l-2.2 1.4M17 15.5 14.5 20h-5L7 15.5M7 15.5H3.8M7 15.5l2.2-1.4M19.2 12.2 21 16.4l-4.5 1.4M4.8 11.8 3 7.6l4.5-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBox({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path
        d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 12v9M3.5 7.5 12 12l8.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLeaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path
        d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M5 19c2.5-5 7-9.5 14-11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconChart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconFile({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path
        d="M7 3.5h7l5 5V20.5H7V3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 3.5v5h5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconIdentify({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M16.5 4.2c1.6.4 2.8 1.6 3.2 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <path d="M4 11.5 12 4l8 7.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m8.5 12.2 2.4 2.4 4.6-5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLink({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path
        d="M9.5 14.5 7.8 16.2a3.2 3.2 0 0 1-4.5-4.5l2.4-2.4M14.5 9.5l1.7-1.7a3.2 3.2 0 1 1 4.5 4.5l-2.4 2.4M9.2 14.8l5.6-5.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPlay({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3.5 w-3.5", className)} fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5L8 5.5Z" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path d="M4 20V6.5L12 3l8 3.5V20H4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5M9 9h.01M12 9h.01M15 9h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <circle cx="12" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 20c.6-4 3.1-6 7.5-6s6.9 2 7.5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevron({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconClipboard({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      <rect x="6" y="5" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 5.5V4h6v1.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 11h6M9 14.5h6M9 18h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
