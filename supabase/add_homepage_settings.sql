-- ================================================================
-- Homepage settings for /admin/store-customization
-- Run this ONCE in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- hero_slides: JSONB array of hero carousel slides
-- announcement_bar: thin top strip text shown above the header
-- promo_banner: promo banner section shown on the homepage
-- ================================================================

ALTER TABLE store_settings
  ADD COLUMN IF NOT EXISTS hero_slides JSONB;

ALTER TABLE store_settings
  ADD COLUMN IF NOT EXISTS announcement_bar TEXT;

ALTER TABLE store_settings
  ADD COLUMN IF NOT EXISTS promo_banner TEXT;
