alter table public.profiles
add column if not exists active_tag text;

alter table public.profiles
drop constraint if exists profiles_active_tag_check;

alter table public.profiles
add constraint profiles_active_tag_check
check (active_tag in ('cofounder_looking', 'idea_looking', 'team_complete', 'just_building'));
