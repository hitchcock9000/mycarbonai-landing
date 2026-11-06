create table if not exists public.evaluation_rate_limits (
  key text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0
);

alter table public.evaluation_rate_limits enable row level security;

create or replace function public.consume_evaluation_rate_limit(
  rate_key text,
  max_requests integer default 5,
  window_seconds integer default 60
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare allowed boolean;
begin
  insert into public.evaluation_rate_limits(key, window_started_at, request_count)
  values (rate_key, now(), 1)
  on conflict (key) do update set
    window_started_at = case when now() - evaluation_rate_limits.window_started_at >= make_interval(secs => window_seconds) then now() else evaluation_rate_limits.window_started_at end,
    request_count = case when now() - evaluation_rate_limits.window_started_at >= make_interval(secs => window_seconds) then 1 else evaluation_rate_limits.request_count + 1 end;
  select request_count <= max_requests into allowed from public.evaluation_rate_limits where key = rate_key;
  return allowed;
end;
$$;

revoke all on function public.consume_evaluation_rate_limit(text, integer, integer) from public, anon, authenticated;
