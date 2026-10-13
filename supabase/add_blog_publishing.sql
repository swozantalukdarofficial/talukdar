-- ================================================================
-- Blog draft / publish / scheduled publishing.
-- Run ONCE in the Supabase SQL Editor (Dashboard -> SQL Editor).
--
-- Visibility rule used by the storefront:
--   status = 'published' AND (published_at IS NULL OR published_at <= now())
-- A "scheduled" post is status='published' with a future published_at.
-- ================================================================

alter table blogs
  add column if not exists status text not null default 'published'
  check (status in ('draft','published'));

alter table blogs
  add column if not exists published_at timestamptz;

-- Backfill: existing posts were all effectively published.
update blogs
set published_at = created_at
where published_at is null;

create index if not exists blogs_status_idx on blogs (status);
create index if not exists blogs_published_at_idx on blogs (published_at);
