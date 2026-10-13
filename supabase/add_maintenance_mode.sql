-- ================================================================
-- Maintenance mode for the storefront
-- Run this ONCE in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- Adds a maintenance_mode flag + message to store_settings.
-- Toggle it from /admin/settings -> "Maintenance" tab.
-- ================================================================

ALTER TABLE store_settings
  ADD COLUMN IF NOT EXISTS maintenance_mode BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE store_settings
  ADD COLUMN IF NOT EXISTS maintenance_message TEXT NOT NULL DEFAULT 'We are performing scheduled maintenance. Please check back soon.';
