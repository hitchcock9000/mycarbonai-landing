import { STEPS } from "../data/content";
import { IconBolt, IconChart, IconFile, IconIdentify, IconLeaf } from "./Icons";
import { cn } from "../utils/cn";

const ICONS = [IconIdentify, IconChart, IconLeaf, IconBolt, IconFile];

type ProcessStepsProps = {
  className?: string;
  compact?: boolean;
  highlight?: number;
};

export function ProcessSteps({ className, compact = false, highlight = 0 }: ProcessStepsProps) {
  return (
    <ol className={cn("relative grid grid-cols-5 gap-2", className)}>
      <span
        className="pointer-events-none absolute left-[10%] right-[10%] top-[1.15rem] h-px bg-[#d7dbe3]"
        aria-hidden
      />
      {STEPS.map((step, i) => {
        const Icon = ICONS[i];
        const active = i === highlight;
        return (
          <li key={step.id} className="relative z-[1] flex flex-col items-center text-center">
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full border bg-white shadow-sm",
                active ? "border-transparent bg-cyan text-ink" : "border-[#e1e5ec] text-ink",
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <p className={cn("mt-3 font-bold text-ink", compact ? "text-[0.8rem]" : "text-[0.92rem]")}>
              {step.title}
            </p>
            {!compact && (
              <p className="mt-1 max-w-[10.5rem] text-[0.75rem] leading-snug text-muted">{step.text}</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
