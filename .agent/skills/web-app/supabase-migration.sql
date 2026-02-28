-- Run this in Supabase Dashboard → SQL Editor to enable star counts.

create table if not exists public.skill_stars (
  skill_id text primary key,
  star_count bigint not null default 0
);

-- Allow anonymous read/write for the app (or use RLS for stricter rules).
alter table public.skill_stars enable row level security;

create policy "Allow anonymous read"
  on public.skill_stars for select
  using (true);

create policy "Allow anonymous insert"
  on public.skill_stars for insert
  with check (true);

create policy "Allow anonymous update"
  on public.skill_stars for update
  using (true);
