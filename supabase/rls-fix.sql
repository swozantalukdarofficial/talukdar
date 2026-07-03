-- ================================================================
-- RLS FIX — Run this in Supabase SQL Editor
-- ================================================================

-- 1. Allow anon/authenticated to INSERT products (admin panel)
CREATE POLICY "Allow anon insert products"
ON products FOR INSERT
WITH CHECK (true);

-- 2. Allow anon/authenticated to UPDATE products
CREATE POLICY "Allow anon update products"
ON products FOR UPDATE
USING (true)
WITH CHECK (true);

-- 3. Allow anon/authenticated to DELETE products
CREATE POLICY "Allow anon delete products"
ON products FOR DELETE
USING (true);

-- Done! Now your admin panel can add/edit/delete products.
-- For production: add authentication check instead of 'true'.
