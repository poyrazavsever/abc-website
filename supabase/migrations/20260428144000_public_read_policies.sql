-- Drop existing restrictive select policies
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can view own projects" on public.projects;

-- Create new public read policies
create policy "Profiles are viewable by everyone" 
on public.profiles 
for select 
to public 
using (true);

create policy "Projects are viewable by everyone" 
on public.projects 
for select 
to public 
using (true);
