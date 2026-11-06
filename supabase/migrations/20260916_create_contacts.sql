-- Pedidos de avaliação submetidos na landing page.
--
-- Já aplicada ao projeto eradhyheupohvaprsmyw (mycarbonai-dashboard).
--
-- RLS: activada SEM políticas. Isto é deliberado.
-- Nem 'anon' nem 'authenticated' lêem ou escrevem esta tabela. A única via de
-- escrita é a Edge Function 'evaluation-request', que usa a service role e
-- portanto contorna a RLS. Assim a chave publicável que viaja no bundle do
-- browser não dá acesso a nada.
--
-- Substitui db/migrations/20260824_create_contacts.sql, que tinha
-- "FOR SELECT USING (true)" em contacts — qualquer pessoa com a chave anónima
-- lia a tabela inteira (nomes, emails, organizações). Esse ficheiro nunca foi
-- aplicado; não o apliques.
--
-- O linter do Supabase vai marcar 'rls_enabled_no_policy' (nível INFO) nesta
-- tabela. É o resultado pretendido, não um erro a corrigir.

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name text not null check (length(btrim(name)) between 1 and 200),
  email text not null check (position('@' in email) > 1 and length(email) <= 320),
  company text not null check (length(btrim(company)) between 1 and 200),

  -- Resposta a "Nos últimos 12 meses, alguém pediu estes dados?"
  request text check (request is null or length(request) <= 200),
  context text check (context is null or length(context) <= 5000),

  source text not null default 'landing',
  locale text not null default 'pt-PT',
  utm jsonb,

  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'declined')),

  confirmation_sent_at timestamptz,
  confirmation_error text
);

comment on table public.contacts is
  'Pedidos de avaliação da landing. Escrito apenas pela Edge Function evaluation-request (service role). RLS sem políticas por desenho.';

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_email_idx on public.contacts (lower(email));
create index if not exists contacts_status_idx on public.contacts (status) where status = 'new';

alter table public.contacts enable row level security;
