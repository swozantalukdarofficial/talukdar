-- Admin activity log for the /admin/activity viewer.
-- Run once in the Supabase SQL Editor.
--
-- Records who did what: order status changes, blog/staff/product CRUD, etc.
-- Only allowlisted admins can read/write (no public access).

create table if not exists admin_activity (
  id uuid primary key default gen_random_uuid(),
  admin_email text not null,
  action text not null,
  entity text not null,
  entity_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

alter table admin_activity enable row level security;

drop policy if exists "Allowlisted admins manage activity" on admin_activity;

-- Only allowlisted admin emails (via their Supabase Auth JWT) can read/write.
-- Works with both the service-role key and the anon fallback in
-- /api/admin/activity.
create policy "Allowlisted admins manage activity"
  on admin_activity for all
  to authenticated
  using (
    lower(auth.jwt() ->> 'email') in (
      'shipontalukdaroffice@gmail.com',
      'swozantalukdaofficial@gmail.com'
    )
  )
  with check (
    lower(auth.jwt() ->> 'email') in (
      'shipontalukdaroffice@gmail.com',
      'swozantalukdaofficial@gmail.com'
    )
  );

create index if not exists admin_activity_created_idx on admin_activity (created_at desc);
create index if not exists admin_activity_entity_idx on admin_activity (entity, action);
