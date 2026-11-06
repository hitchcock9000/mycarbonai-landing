import { useEffect } from "react";

const SCRIPT_URL = "https://unpkg.com/website-carbon-badges@1.1.3/b.min.js";

export function WebsiteCarbonBadge({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled || document.querySelector(`script[src="${SCRIPT_URL}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.defer = true;
    script.dataset.websiteCarbonBadge = "true";
    document.body.appendChild(script);
    return () => script.remove();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="mt-5 min-h-12 text-xs text-white/70" aria-label="Website Carbon">
      <div id="wcb" className="carbonbadge wcb-d" />
    </div>
  );
}
