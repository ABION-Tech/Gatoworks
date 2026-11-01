-- Run once in Supabase: SQL Editor > New query > paste > Run.
-- Stores text edits made in the visual editor (admin.html).
create table if not exists public.site_text (
  key text primary key,
  html text not null,
  updated_at timestamptz not null default now()
);
alter table public.site_text enable row level security;

drop policy if exists "site_text public read" on public.site_text;
create policy "site_text public read" on public.site_text for select using (true);

drop policy if exists "site_text admin write" on public.site_text;
create policy "site_text admin write" on public.site_text for all to authenticated using (true) with check (true);
