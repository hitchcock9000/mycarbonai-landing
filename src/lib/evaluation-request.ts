/// <reference types="vite/client" />

import { CONTACT_EMAILS } from "../config/contact";

export type EvaluationRequest = {
  name: string;
  company: string;
  email: string;
  request: string;
  context: string;
  website: string;
  locale: "pt" | "en";
};

type SubmissionResult =
  | { ok: true; duplicate: boolean }
  | { ok: false; error: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function submitEvaluationRequest(values: EvaluationRequest): Promise<SubmissionResult> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { ok: false, error: "endpoint-not-configured" };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/evaluation-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
      },
      body: JSON.stringify({
        name: values.name,
        company: values.company,
        email: values.email,
        request: values.request,
        context: values.context,
        website: values.website,
        source: "landing",
        locale: values.locale === "en" ? "en" : "pt-PT",
      }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => null) as { ok?: boolean; duplicate?: boolean; error?: string } | null;
    if (!response.ok || !payload?.ok) {
      return { ok: false, error: payload?.error || `request-failed-${response.status}` };
    }

    return { ok: true, duplicate: Boolean(payload.duplicate) };
  } catch (error) {
    return { ok: false, error: error instanceof Error && error.name === "AbortError" ? "timeout" : "network-error" };
  } finally {
    window.clearTimeout(timeout);
  }
}

export function buildMailtoFallback(values: EvaluationRequest): string {
  const english = values.locale === "en";
  const subject = encodeURIComponent(`${english ? "Pilot conversation request" : "Pedido de conversa sobre o piloto"} — ${values.company}`);
  const body = encodeURIComponent([
    `${english ? "Name" : "Nome"}: ${values.name}`,
    `${english ? "Hotel or organisation" : "Hotel ou organização"}: ${values.company}`,
    `Email: ${values.email}`,
    `${english ? "Requested information" : "Pedido"}: ${values.request}`,
    "",
    `${english ? "Context" : "Contexto"}:`,
    values.context || "—",
  ].join("\n"));
  return `mailto:${CONTACT_EMAILS.partnerships}?subject=${subject}&body=${body}`;
}
