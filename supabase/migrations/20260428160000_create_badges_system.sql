-- Add event_attendance_count to profiles
alter table public.profiles
add column if not exists event_attendance_count integer not null default 0;

-- Create badges table
create table if not exists public.badges (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  description text,
  icon_url text,
  trigger text not null,
  required_attendance_count integer not null default 0,
  is_manual boolean not null default false,
  status text not null default 'published',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Trigger for badges updated_at
create trigger set_badges_updated_at
before update on public.badges
for each row
execute function public.set_updated_at();

-- Create user_badges table
create table if not exists public.user_badges (
  id uuid primary key default extensions.gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  assigned_by uuid references auth.users(id) on delete set null,
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  unique(user_id, badge_id)
);

create index if not exists user_badges_user_id_idx on public.user_badges(user_id);
create index if not exists user_badges_badge_id_idx on public.user_badges(badge_id);

-- Enable RLS
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

-- Public read policies
drop policy if exists "Badges are viewable by everyone" on public.badges;
create policy "Badges are viewable by everyone" 
on public.badges for select to public using (status = 'published');

drop policy if exists "User badges are viewable by everyone" on public.user_badges;
create policy "User badges are viewable by everyone" 
on public.user_badges for select to public using (true);

-- Insert some default badges
insert into public.badges (name, description, trigger, required_attendance_count, is_manual, status)
values 
('İlk Adım', 'ABC ağına katılıp ilk etkinliğine gelenlere verilir.', '1 Etkinlik Katılımı', 1, false, 'published'),
('Düzenli Builder', 'Topluluk etkinliklerine düzenli katılım gösterenlere verilir.', '5 Etkinlik Katılımı', 5, false, 'published'),
('Core Builder', 'Topluluğa en çok değer katan, öncü builderlara verilir.', 'Admin Ataması', 0, true, 'published')
on conflict do nothing;
