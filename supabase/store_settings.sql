-- ================================================================
-- Create store_settings table for dynamic store management
-- Run this in your Supabase SQL Editor
-- ================================================================

CREATE TABLE IF NOT EXISTS store_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  store_name TEXT NOT NULL DEFAULT 'EV Solution BD',
  support_email TEXT NOT NULL DEFAULT 'support@evsolutionbd.com',
  support_phone TEXT NOT NULL DEFAULT '01333600272',
  whatsapp_number TEXT NOT NULL DEFAULT '8801333600272',
  shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 150.00,
  enable_cod BOOLEAN NOT NULL DEFAULT true,
  enable_bkash BOOLEAN NOT NULL DEFAULT true,
  enable_nagad BOOLEAN NOT NULL DEFAULT true,
  bkash_number TEXT NOT NULL DEFAULT '01333600272',
  nagad_number TEXT NOT NULL DEFAULT '01333600272',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist to avoid duplication errors
DROP POLICY IF EXISTS "Public read store_settings" ON store_settings;
DROP POLICY IF EXISTS "Authenticated users update store_settings" ON store_settings;
DROP POLICY IF EXISTS "Public insert store_settings" ON store_settings;

-- Create Policies
CREATE POLICY "Public read store_settings" ON store_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users update store_settings" ON store_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Public insert store_settings" ON store_settings FOR INSERT WITH CHECK (true);

-- Insert initial default settings row
INSERT INTO store_settings (
  id, 
  store_name, 
  support_email, 
  support_phone, 
  whatsapp_number, 
  shipping_fee, 
  enable_cod, 
  enable_bkash, 
  enable_nagad, 
  bkash_number, 
  nagad_number
)
VALUES (
  'global', 
  'EV Solution BD', 
  'support@evsolutionbd.com', 
  '01333600272', 
  '8801333600272', 
  150.00, 
  true, 
  true, 
  true, 
  '01333600272', 
  '01333600272'
)
ON CONFLICT (id) DO NOTHING;
