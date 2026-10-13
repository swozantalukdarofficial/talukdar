-- ================================================================
-- Add order notification email to store_settings
-- Run this ONCE in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- This lets the admin panel control which email receives new-order alerts
-- ================================================================

ALTER TABLE store_settings
  ADD COLUMN IF NOT EXISTS order_notification_email TEXT NOT NULL DEFAULT 'swozantalukdaofficial@gmail.com';

-- Backfill: keep existing row's default if it was created before this column
UPDATE store_settings
SET order_notification_email = 'swozantalukdaofficial@gmail.com'
WHERE order_notification_email IS NULL OR order_notification_email = '';
