alter table public.projects
  add column if not exists technologies text,
  add column if not exists image_path text,
  add column if not exists image_url text;

alter table public.projects
  drop constraint if exists projects_image_path_matches_owner_check,
  add constraint projects_image_path_matches_owner_check
    check (image_path is null or image_path like owner_id::text || '/%');

alter table public.projects
  drop constraint if exists projects_image_url_check,
  add constraint projects_image_url_check
    check (image_url is null or image_url like 'https://%');

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Project images are publicly readable." on storage.objects;
drop policy if exists "Users can upload their own project images." on storage.objects;
drop policy if exists "Users can update their own project images." on storage.objects;
drop policy if exists "Users can delete their own project images." on storage.objects;

create policy "Project images are publicly readable."
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-images');

create policy "Users can upload their own project images."
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'project-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can update their own project images."
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'project-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'project-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can delete their own project images."
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'project-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
