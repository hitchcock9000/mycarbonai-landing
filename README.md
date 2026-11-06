# MyCarbonAI — landing page MVP

Standalone React, TypeScript, Vite and Tailwind landing page from the provided horizontal-scroll MVP archive.

## Development

```sh
npm ci
npm run dev
```

## Contact form

The contact form submits to the existing Supabase `evaluation-request` function used by MyCarbonAI 1.0. Copy `.env.example` to `.env.local` and provide the Supabase project URL and publishable key to enable direct submission. If these values are not configured, or the request cannot be completed, the form offers an email draft addressed to `info@mycarbonai.com` instead.

Only the public/publishable Supabase key belongs in this frontend configuration. Never add the Supabase service-role key or Resend API key here; those remain server-side secrets in Supabase.

The matching Edge Function, email templates and database migrations are included under `supabase/`. The public function requires the `RESEND_API_KEY` secret; `RESEND_FROM` and `RESEND_INTERNAL` may be set as Supabase secrets to override the defaults. Apply the included migrations to the same Supabase project, then deploy `evaluation-request` with JWT verification disabled for this public form (`supabase functions deploy evaluation-request --no-verify-jwt`). Deployment is a separate operation and is not performed by the frontend build.

## Privacy and discovery

The Website Carbon badge loads only after the visitor explicitly enables it in the privacy controls. Google Analytics is not installed. Search metadata, an organization JSON-LD record, `robots.txt` and `sitemap.xml` are included for `mycarbonai.com`.

## Production build

```sh
npm run build
```
