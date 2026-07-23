-- ================================================================
-- EV Solution BD — Supabase Blogs Table Schema
-- Run this in your Supabase SQL Editor
-- ================================================================

CREATE TABLE IF NOT EXISTS blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  read_time text NOT NULL,
  image text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  meta_title text NOT NULL,
  meta_desc text NOT NULL,
  content text NOT NULL,
  date text NOT NULL,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Select policy: public can read
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (true);

-- Insert/Update/Delete policy: allowed for admin clients
CREATE POLICY "Public manage blogs" ON blogs FOR ALL USING (true) WITH CHECK (true);
