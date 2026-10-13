-- Staff / team directory table for the /admin/staff page.
-- Run once in the Supabase SQL Editor.
--
-- IMPORTANT — access model (be honest about this):
-- Login access to /admin is controlled by the Supabase Auth email allowlist
-- (ADMIN_EMAILS / NEXT_PUBLIC_ADMIN_EMAILS env), NOT by this table.
-- This table is a real, persisted team directory: names, contact info, roles
-- (organizational labels) and active/inactive status. Marking someone
-- "Inactive" here does NOT revoke their login — do that in Supabase Auth.
--
-- If you change the admin emails, update the two addresses in the policy below.

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  role text not null default 'Support Staff'
    check (role in ('Super Admin','Store Manager','Order Dispatcher','Support Staff')),
  joining_date date not null default current_date,
  status text not null default 'Active'
    check (status in ('Active','Inactive')),
  created_at timestamptz not null default now()
);

alter table staff enable row level security;

-- No public access at all: the staff directory contains PII (emails, phones).
drop policy if exists "Public read staff" on staff;
drop policy if exists "Allowlisted admins manage staff" on staff;

-- Only allowlisted admin emails (via their Supabase Auth JWT) can manage staff.
-- Works with both the service-role key and the anon fallback in /api/admin/staff.
create policy "Allowlisted admins manage staff"
  on staff for all
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

create index if not exists staff_email_idx on staff (lower(email));
create index if not exists staff_status_idx on staff (status);
