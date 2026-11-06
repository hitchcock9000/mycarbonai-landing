// Templates de email para pedidos de avaliação.
//
// Regras deliberadas:
//  - Estilos inline e layout em <table>. O <style> no <head> é removido por
//    vários clientes (Outlook desktop, alguns webmails), por isso não há
//    nenhuma classe CSS aqui.
//  - Sem webfonts. Manrope encabeça a pilha e degrada para fontes de sistema;
//    clientes de email não carregam webfonts de forma fiável.
//  - Cores do brand book (Logo System & Usage Guidelines), iguais a src/App.css: --ink #000e23, --cyan #00dad8,
//    --paper #f3f5f2, --line #a9b9c4, --muted #385476.
//  - Copy alinhada com a landing e o About: produto em validação, sem
//    promessas de plataforma, demo, certificação ou features beta.

export const BRAND = {
  ink: "#000e23",
  cyan: "#00dad8",
  paper: "#f3f5f2",
  line: "#a9b9c4",
  muted: "#385476",
  white: "#ffffff",
} as const;

const SANS =
  "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const MONO =
  "'DM Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export interface Submission {
  name: string;
  company: string;
  email: string;
  request?: string | null;
  context?: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e3e8ea;font:500 13px/1.5 ${SANS};color:${BRAND.muted};width:38%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e3e8ea;font:400 13px/1.5 ${SANS};color:${BRAND.ink};vertical-align:top;white-space:pre-line;">${escapeHtml(value)}</td>
    </tr>`;
}

function step(number: string, title: string, text: string): string {
  return `
    <tr>
      <td style="padding:0 12px 0 0;font:500 12px/1.6 ${MONO};color:${BRAND.cyan};vertical-align:top;width:28px;">${number}</td>
      <td style="padding:0 0 14px;font:400 14px/1.6 ${SANS};color:${BRAND.ink};vertical-align:top;">
        <strong style="font-weight:700;">${escapeHtml(title)}</strong><br />
        <span style="color:${BRAND.muted};">${escapeHtml(text)}</span>
      </td>
    </tr>`;
}

export type Locale = "pt-PT" | "en";

// Texto da confirmação em cada idioma. A notificação interna fica sempre em PT.
const CONFIRMATION = {
  "pt-PT": {
    htmlLang: "pt-PT",
    title: "Recebemos o seu pedido de avaliação",
    preheader: (company: string) => `Registámos o pedido de ${company}. Respondemos pessoalmente.`,
    status: "EM VALIDAÇÃO &nbsp;·&nbsp; PORTUGAL",
    heading: "Recebemos o seu pedido de avaliação.",
    thanks: (name: string) => `Obrigado, ${name}. Registámos o pedido de`,
    reply: "Respondo pessoalmente, normalmente dentro de dois dias úteis.",
    stepsTitle: "COMO FUNCIONA A CONVERSA",
    steps: [
      ["01", "Processo atual", "Mostra-nos como reúne hoje os dados das suas unidades."],
      ["02", "Demonstração", "Percorremos o fluxo com um documento seu, ou com o exemplo demonstrativo."],
      ["03", "Próximo passo", "Se fizer sentido, definimos o âmbito e as condições de um piloto."],
    ],
    detailsTitle: "O QUE NOS ENVIOU",
    labels: {
      name: "Nome",
      company: "Hotel ou organização",
      email: "Email",
      request: "Pedidos nos últimos 12 meses",
      context: "Contexto",
    },
    correction: "Se algum destes dados estiver errado, basta responder a este email — chega diretamente a mim.",
    place: "MyCarbonAI · Portimão, Portugal",
    disclaimer:
      "A MyCarbonAI está em validação. Não existe ainda plataforma pública, API, certificação independente ou verificação por terceiros — e um piloto não constitui certificação nem garantia de conformidade regulatória.",
    footer:
      "Recebeu este email porque submeteu o formulário de pedido de avaliação em mycarbonai.com. É uma confirmação única — não o inscrevemos em nenhuma lista de divulgação.",
    subject: (company: string) => `Recebemos o seu pedido de avaliação — ${company}`,
  },
  en: {
    htmlLang: "en",
    title: "We have received your evaluation request",
    preheader: (company: string) => `We have recorded the request from ${company}. I will reply personally.`,
    status: "IN VALIDATION &nbsp;·&nbsp; PORTUGAL",
    heading: "We have received your evaluation request.",
    thanks: (name: string) => `Thank you, ${name}. We have recorded the request from`,
    reply: "I will reply personally, usually within two working days.",
    stepsTitle: "HOW THE CONVERSATION WORKS",
    steps: [
      ["01", "Current process", "You show us how you gather data across your properties today."],
      ["02", "Walkthrough", "We go through the workflow with one of your documents, or with the sample."],
      ["03", "Next step", "If it makes sense, we agree the scope and terms of a pilot."],
    ],
    detailsTitle: "WHAT YOU SENT US",
    labels: {
      name: "Name",
      company: "Hotel or organisation",
      email: "Email",
      request: "Requests in the last 12 months",
      context: "Context",
    },
    correction: "If any of these details are wrong, just reply to this email — it comes straight to me.",
    place: "MyCarbonAI · Portimão, Portugal",
    disclaimer:
      "MyCarbonAI is in validation. There is not yet a public platform, API, independent certification or third-party verification — and a pilot is not a certification or a guarantee of regulatory compliance.",
    footer:
      "You received this email because you submitted the evaluation request form on mycarbonai.com. This is a one-off confirmation — we have not added you to any mailing list.",
    subject: (company: string) => `We have received your evaluation request — ${company}`,
  },
} as const;

/** Email de confirmação enviado a quem submeteu o formulário, no idioma do pedido. */
export function confirmationEmail(
  s: Submission,
  locale: Locale = "pt-PT",
): { subject: string; html: string; text: string } {
  const c = CONFIRMATION[locale] ?? CONFIRMATION["pt-PT"];
  const l = c.labels;
  const details = [
    row(l.name, s.name),
    row(l.company, s.company),
    row(l.email, s.email),
    s.request ? row(l.request, s.request) : "",
    s.context ? row(l.context, s.context) : "",
  ].join("");

  const html = `<!DOCTYPE html>
<html lang="${c.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${c.title}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.paper};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(c.preheader(s.company))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.paper};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${BRAND.white};">

          <tr>
            <td style="background-color:${BRAND.ink};padding:32px 32px 28px;border-bottom:3px solid ${BRAND.cyan};">
              <div style="font:800 22px/1.2 ${SANS};color:${BRAND.white};letter-spacing:-0.4px;">MyCarbonAI</div>
              <div style="margin-top:8px;font:400 11px/1.4 ${MONO};color:${BRAND.cyan};letter-spacing:1.4px;">${c.status}</div>
            </td>
          </tr>

          <tr>
            <td style="padding:34px 32px 0;">
              <h1 style="margin:0 0 18px;font:800 24px/1.25 ${SANS};color:${BRAND.ink};letter-spacing:-0.5px;">${c.heading}</h1>
              <p style="margin:0 0 16px;font:400 15px/1.7 ${SANS};color:${BRAND.muted};">
                ${escapeHtml(c.thanks(s.name))} <strong style="color:${BRAND.ink};">${escapeHtml(s.company)}</strong>.
                ${c.reply}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f9fa;border-left:3px solid ${BRAND.cyan};padding:20px;">
                <tr><td>
                  <div style="font:700 12px/1.4 ${MONO};color:${BRAND.muted};letter-spacing:1.2px;padding-bottom:14px;">${c.stepsTitle}</div>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${c.steps.map(([n, title, text]) => step(n, title, text)).join("")}
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 0;">
              <div style="font:700 12px/1.4 ${MONO};color:${BRAND.muted};letter-spacing:1.2px;padding-bottom:6px;">${c.detailsTitle}</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${details}</table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 0;">
              <p style="margin:0;font:400 13px/1.7 ${SANS};color:${BRAND.muted};">${c.correction}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e3e8ea;">
                <tr><td style="padding-top:20px;">
                  <p style="margin:0 0 4px;font:700 14px/1.5 ${SANS};color:${BRAND.ink};">Natasha Silvestre</p>
                  <p style="margin:0;font:400 13px/1.6 ${SANS};color:${BRAND.muted};">${c.place}</p>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 32px;">
              <p style="margin:0;font:400 12px/1.65 ${SANS};color:#7d8e9b;">${c.disclaimer}</p>
            </td>
          </tr>

          <tr>
            <td style="background-color:${BRAND.paper};padding:22px 32px;border-top:1px solid #e3e8ea;">
              <p style="margin:0 0 6px;font:400 12px/1.6 ${SANS};color:${BRAND.muted};">
                <a href="mailto:info@mycarbonai.com" style="color:${BRAND.muted};text-decoration:none;">info@mycarbonai.com</a>
              </p>
              <p style="margin:0;font:400 11px/1.6 ${SANS};color:#93a2ad;">${c.footer}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    c.heading,
    "",
    `${c.thanks(s.name)} ${s.company}.`,
    c.reply,
    "",
    c.stepsTitle,
    ...c.steps.map(([n, title, body]) => `${n} ${title} — ${body}`),
    "",
    c.detailsTitle,
    `${l.name}: ${s.name}`,
    `${l.company}: ${s.company}`,
    `${l.email}: ${s.email}`,
    s.request ? `${l.request}: ${s.request}` : null,
    s.context ? `${l.context}: ${s.context}` : null,
    "",
    c.correction,
    "",
    "Natasha Silvestre",
    c.place,
    "",
    c.disclaimer,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject: c.subject(s.company), html, text };
}

/** Notificação interna, para agir sobre o pedido. */
export function internalEmail(
  s: Submission,
  contactId: string,
  locale: Locale = "pt-PT",
): { subject: string; html: string; text: string } {
  const language = locale === "en" ? "Inglês" : "Português";
  const details = [
    row("Nome", s.name),
    row("Hotel ou organização", s.company),
    row("Email", s.email),
    row("Pedidos nos últimos 12 meses", s.request || "—"),
    row("Contexto", s.context || "—"),
    row("Idioma do pedido", language),
    row("ID do registo", contactId),
  ].join("");

  const html = `<!DOCTYPE html>
<html lang="pt-PT">
<head><meta charset="UTF-8" /><title>Novo pedido de avaliação</title></head>
<body style="margin:0;padding:24px 12px;background-color:${BRAND.paper};">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background-color:${BRAND.white};">
    <tr>
      <td style="background-color:${BRAND.ink};padding:22px 28px;border-bottom:3px solid ${BRAND.cyan};">
        <div style="font:700 12px/1.4 ${MONO};color:${BRAND.cyan};letter-spacing:1.4px;">NOVO PEDIDO DE AVALIAÇÃO</div>
        <div style="margin-top:6px;font:800 19px/1.3 ${SANS};color:${BRAND.white};">${escapeHtml(s.company)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${details}</table>
        <p style="margin:22px 0 0;font:400 13px/1.6 ${SANS};color:${BRAND.muted};">
          Responder para <a href="mailto:${escapeHtml(s.email)}" style="color:${BRAND.ink};">${escapeHtml(s.email)}</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `NOVO PEDIDO DE AVALIAÇÃO — ${s.company}`,
    "",
    `Nome: ${s.name}`,
    `Hotel ou organização: ${s.company}`,
    `Email: ${s.email}`,
    `Pedidos nos últimos 12 meses: ${s.request || "—"}`,
    `Contexto: ${s.context || "—"}`,
    `Idioma do pedido: ${language}`,
    `ID do registo: ${contactId}`,
  ].join("\n");

  return {
    subject: `Novo pedido de avaliação — ${s.company}`,
    html,
    text,
  };
}
