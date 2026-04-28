create table if not exists public.analytics_events (
  id uuid primary key default extensions.gen_random_uuid(),
  event_name text not null,
  user_id uuid references auth.users(id) on delete set null,
  properties jsonb default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists analytics_events_event_name_idx on public.analytics_events(event_name);
create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at desc);

alter table public.analytics_events enable row level security;

-- Allow public to insert events
drop policy if exists "Anyone can insert analytics events" on public.analytics_events;
create policy "Anyone can insert analytics events"
on public.analytics_events
for insert
to public
with check (true);

-- Only admins/service_role can read, no select policy for public or standard authenticated
drop policy if exists "Service role can read analytics events" on public.analytics_events;
create policy "Service role can read analytics events"
on public.analytics_events
for select
to service_role
using (true);
