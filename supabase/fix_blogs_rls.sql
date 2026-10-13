-- ================================================================
-- EV Solution BD — Fix blogs RLS: remove public write access
-- Run ONCE in the Supabase SQL Editor.
--
-- IMPORTANT: SUPABASE_SERVICE_ROLE_KEY is NOT configured in this
-- project, so admin writes go through the anon key with the admin's
-- own login JWT attached. The allowlist below MUST match the admin
-- emails used by the app (ADMIN_EMAILS env / AdminClientGuard).
--
-- >>> ADMIN EMAIL ALLOWLIST — EDIT THESE IF YOUR ADMIN LIST CHANGES <<<
--   'shipontalukdaroffice@gmail.com'
--   'swozantalukdaofficial@gmail.com'
-- ================================================================

-- 1. Drop the dangerous open policy (idempotent)
DROP POLICY IF EXISTS "Public manage blogs" ON blogs;

-- 2. Make sure RLS stays on (idempotent)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 3. Public read for the storefront /blog pages (recreate idempotently)
DROP POLICY IF EXISTS "Public read blogs" ON blogs;
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (true);

-- 4. Writes (INSERT/UPDATE/DELETE): only logged-in users whose email
--    is in the allowlist at the top of this file. The anon key alone
--    (no login) can no longer write anything.
DROP POLICY IF EXISTS "Admin manage blogs" ON blogs;
CREATE POLICY "Admin manage blogs" ON blogs
  FOR ALL
  TO authenticated
  USING (
    lower(auth.jwt() ->> 'email') IN (
      -- >>> keep in sync with the ADMIN EMAIL ALLOWLIST above <<<
      'shipontalukdaroffice@gmail.com',
      'swozantalukdaofficial@gmail.com'
    )
  )
  WITH CHECK (
    lower(auth.jwt() ->> 'email') IN (
      -- >>> keep in sync with the ADMIN EMAIL ALLOWLIST above <<<
      'shipontalukdaroffice@gmail.com',
      'swozantalukdaofficial@gmail.com'
    )
  );
