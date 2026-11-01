-- Already applied to the live project on 1 Nov 2026. Kept for reference / rebuilding.
-- Stores text edits and brand colours made in the visual editor (admin.html).
-- Writes are limited to emails listed in public.gw_admins (same rule as photos).
create table if not exists public.site_text (
  key text primary key,
  html text not null,
  updated_at timestamptz not null default now()
);
alter table public.site_text enable row level security;

drop policy if exists "site_text public read" on public.site_text;
create policy "site_text public read" on public.site_text for select using (true);

drop policy if exists "site_text admin write" on public.site_text;
create policy "site_text admin write" on public.site_text for all to authenticated using (is_gw_admin()) with check (is_gw_admin());
