// Edge Function: evaluation-request
//
// Recebe o formulário "Pedir avaliação" da landing, grava em public.contacts e
// envia dois emails via Resend: confirmação para quem submeteu, notificação
// interna para a equipa.
//
// Porque é que a escrita passa por aqui e não diretamente do browser:
//  - A chave da Resend nunca pode viajar no bundle. Aqui é um segredo do
//    servidor (Deno.env), não uma variável VITE_*.
//  - public.contacts tem RLS activada SEM políticas. Esta função usa a service
//    role e é a única via de escrita. A chave publicável do browser não lê nem
//    escreve nada nessa tabela.
//
// verify_jwt está desligado por ser um formulário público — não há utilizador
// autenticado a quem pedir um JWT. Em contrapartida a função valida o payload,
// tem honeypot e trava submissões repetidas do mesmo email.
//
// Segredos necessários (supabase secrets set):
//   RESEND_API_KEY      obrigatório
//   RESEND_FROM         ex.: "MyCarbonAI <info@mycarbonai.com>"
//   RESEND_INTERNAL     destino da notificação interna
//   ALLOWED_ORIGINS     lista separada por vírgulas (opcional)
// SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são injectados pela plataforma.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { confirmationEmail, internalEmail, type Locale, type Submission } from "./emails.ts";

const DEFAULT_ORIGINS = [
  "https://mycarbonai.com",
  "https://www.mycarbonai.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const origins = allowedOrigins.length > 0 ? allowedOrigins : DEFAULT_ORIGINS;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const requestBuckets = new Map<string, number[]>();

function isRateLimited(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("cf-connecting-ip") || "unknown";
  const now = Date.now();
  const recent = (requestBuckets.get(address) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  requestBuckets.set(address, recent);

  // Bound memory when an instance receives many unique addresses.
  if (requestBuckets.size > 10_000) {
    for (const [key, times] of requestBuckets) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) requestBuckets.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function requestAddress(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("cf-connecting-ip") || "unknown";
}

/** Previews da Vercel mudam de hostname a cada deploy. */
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (origins.includes(origin)) return true;
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin);
}

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : origins[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Validated extends Submission {
  locale: Locale;
  source: string;
  utm: Record<string, string> | null;
}

function validate(raw: unknown): { ok: true; value: Validated } | { ok: false; error: string } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "Corpo do pedido inválido." };
  }
  const body = raw as Record<string, unknown>;

  const str = (key: string, max: number): string => {
    const value = body[key];
    return typeof value === "string" ? value.trim().slice(0, max) : "";
  };

  const name = str("name", 200);
  const company = str("company", 200);
  const email = str("email", 320).toLowerCase();
  const request = str("request", 200);
  const context = str("context", 5000);

  if (!name) return { ok: false, error: "Indique o seu nome." };
  if (!company) return { ok: false, error: "Indique o hotel ou organização." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Indique um email válido." };

  const utm =
    typeof body.utm === "object" && body.utm !== null && !Array.isArray(body.utm)
      ? Object.fromEntries(
          Object.entries(body.utm as Record<string, unknown>)
            .filter(([, v]) => typeof v === "string")
            .slice(0, 12)
            .map(([k, v]) => [k.slice(0, 40), (v as string).slice(0, 200)]),
        )
      : null;

  return {
    ok: true,
    value: {
      name,
      company,
      email,
      request: request || null,
      context: context || null,
      // Só dois idiomas; qualquer outro valor cai para português.
      locale: str("locale", 10) === "en" ? "en" : "pt-PT",
      source: str("source", 40) || "landing",
      utm: utm && Object.keys(utm).length > 0 ? utm : null,
    },
  };
}

async function sendEmail(payload: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY não está definido.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: [payload.to],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend respondeu ${response.status}: ${detail.slice(0, 400)}`);
  }
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");

  // Reject browser requests from unknown origins before parsing or persisting
  // any payload. Requests without Origin are allowed for server-side clients.
  if (origin && !isAllowedOrigin(origin)) {
    return json({ ok: false, error: "Origem não autorizada." }, 403, origin);
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Método não permitido." }, 405, origin);
  }


  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 32_768) {
    return json({ ok: false, error: "Pedido demasiado grande." }, 413, origin);
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "Corpo do pedido inválido." }, 400, origin);
  }

  // Honeypot: um campo que só um bot preenche. Responde ok para não revelar a
  // armadilha, mas não grava nem envia nada.
  const honeypot = (raw as Record<string, unknown>)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: true }, 200, origin);
  }

  const parsed = validate(raw);
  if (!parsed.ok) {
    return json({ ok: false, error: parsed.error }, 400, origin);
  }
  const submission = parsed.value;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: allowedByDatabase, error: rateLimitError } = await supabase.rpc(
    "consume_evaluation_rate_limit",
    { rate_key: requestAddress(req), max_requests: 5, window_seconds: 60 },
  );
  // Keep the instance-local guard as a fallback while the migration propagates.
  if ((rateLimitError && isRateLimited(req)) || (!rateLimitError && allowedByDatabase === false)) {
    return json({ ok: false, error: "Demasiados pedidos. Tente novamente mais tarde." }, 429, origin);
  }

  // Trava duplicados: mesma pessoa a submeter duas vezes em poucos minutos.
  const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const { data: recent, error: recentError } = await supabase
    .from("contacts")
    .select("id")
    .eq("email", submission.email)
    .gte("created_at", since)
    .limit(1);

  if (recentError) {
    console.error("Falha ao verificar duplicados:", recentError.message);
  } else if (recent && recent.length > 0) {
    // Já recebemos este pedido e a confirmação já saiu. Não duplicar.
    return json({ ok: true, duplicate: true }, 200, origin);
  }

  const { data: inserted, error: insertError } = await supabase
    .from("contacts")
    .insert({
      name: submission.name,
      email: submission.email,
      company: submission.company,
      request: submission.request,
      context: submission.context,
      source: submission.source,
      locale: submission.locale,
      utm: submission.utm,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    console.error("Falha ao gravar o contacto:", insertError?.message);
    return json(
      { ok: false, error: "Não foi possível registar o pedido. Tente novamente." },
      500,
      origin,
    );
  }

  const contactId = inserted.id as string;
  const from = Deno.env.get("RESEND_FROM") ?? "MyCarbonAI <info@mycarbonai.com>";
  const internalTo = Deno.env.get("RESEND_INTERNAL") ?? "info@mycarbonai.com";

  // O registo já está gravado. Falhar o email não deve perder o contacto, por
  // isso o erro é anotado na linha em vez de devolver 500 ao visitante.
  let emailError: string | null = null;
  try {
    const confirmation = confirmationEmail(submission, submission.locale);
    await sendEmail({
      from,
      to: submission.email,
      replyTo: internalTo,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
  } catch (error) {
    emailError = error instanceof Error ? error.message : String(error);
    console.error("Falha ao enviar a confirmação:", emailError);
  }

  await supabase
    .from("contacts")
    .update(
      emailError
        ? { confirmation_error: emailError.slice(0, 1000) }
        : { confirmation_sent_at: new Date().toISOString() },
    )
    .eq("id", contactId);

  try {
    const notification = internalEmail(submission, contactId, submission.locale);
    await sendEmail({
      from,
      to: internalTo,
      replyTo: submission.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });
  } catch (error) {
    console.error(
      "Falha ao enviar a notificação interna:",
      error instanceof Error ? error.message : String(error),
    );
  }

  return json({ ok: true, id: contactId, confirmationSent: emailError === null }, 200, origin);
});
