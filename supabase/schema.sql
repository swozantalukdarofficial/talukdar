-- ================================================================
-- EVStore Bangladesh — Supabase Database Schema v2
-- Run this in your Supabase SQL Editor
-- ================================================================

-- ────────────────────────────────────────────────────────────────
-- 1. PRODUCTS TABLE
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  description      TEXT,
  price            NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10, 2),
  category         TEXT NOT NULL CHECK (category IN ('ebike', 'battery', 'parts', 'accessories')),
  image_url        TEXT NOT NULL,
  images           TEXT[] DEFAULT '{}',
  stock_quantity   INT DEFAULT 0 CHECK (stock_quantity >= 0),
  is_featured      BOOLEAN DEFAULT false,
  specs            JSONB,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Service role write products" ON products FOR ALL USING (auth.role() = 'service_role');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- ────────────────────────────────────────────────────────────────
-- 2. ORDERS TABLE
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name   TEXT NOT NULL,
  customer_email  TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  shipping_address JSONB NOT NULL, -- { street, city, district, zip }
  subtotal        NUMERIC(10, 2) NOT NULL,
  shipping_fee    NUMERIC(10, 2) DEFAULT 150,
  total           NUMERIC(10, 2) NOT NULL,
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method  TEXT DEFAULT 'cod'
                  CHECK (payment_method IN ('cod', 'bkash', 'nagad', 'card')),
  payment_status  TEXT DEFAULT 'unpaid'
                  CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE TRIGGER orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- Anyone can INSERT (place order)
CREATE POLICY "Anyone can place order" ON orders FOR INSERT WITH CHECK (true);
-- Only service role can view all orders
CREATE POLICY "Service role manage orders" ON orders FOR ALL USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- ────────────────────────────────────────────────────────────────
-- 3. ORDER ITEMS TABLE
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id),
  name        TEXT NOT NULL,        -- snapshot at time of order
  image_url   TEXT,
  price       NUMERIC(10, 2) NOT NULL,
  quantity    INT NOT NULL CHECK (quantity > 0),
  subtotal    NUMERIC(10, 2) GENERATED ALWAYS AS (price * quantity) STORED
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manage order items" ON order_items FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Anyone can insert order items" ON order_items FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- ────────────────────────────────────────────────────────────────
-- 4. CATEGORIES (DYNAMIC)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  icon text,
  description text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Public delete categories" ON categories FOR DELETE USING (true);

-- Insert default categories to get started
INSERT INTO categories (name, slug, icon, description) VALUES
('E-Bikes & Scooters', 'ebike', '🚲', 'High-performance electric bicycles & scooters'),
('Commercial EVs', 'commercial', '🛺', 'Electric auto rickshaws, pickups, buses & utility vehicles'),
('Batteries', 'battery', '🔋', 'Long-lasting lithium battery packs'),
('Solar & Inverters', 'solar', '☀️', 'Solar panels, hybrid inverters & solar systems'),
('Parts', 'parts', '⚙️', 'OEM & aftermarket spare parts'),
('Accessories', 'accessories', '🛡️', 'Helmets, chargers & more')
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────────────────────────────
-- 5. SAMPLE PRODUCT DATA
-- ────────────────────────────────────────────────────────────────
INSERT INTO products (name, slug, description, price, compare_at_price, category, image_url, stock_quantity, is_featured, specs) VALUES
(
  'Thunder X1 E-Bike',
  'thunder-x1-ebike',
  'উচ্চ-পারফরম্যান্স আরবান ইলেকট্রিক বাইক। লং-রেঞ্জ লিথিয়াম ব্যাটারি সহ শহরের রাস্তায় নিখুঁতভাবে চলে। ডিজিটাল ডিসপ্লে, LED হেডলাইট এবং ডিস্ক ব্রেক সহ আসে।',
  85000, 95000, 'ebike',
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800',
  10, true,
  '{"range": "80km", "motor": "500W", "speed": "35kmh", "weight": "22kg", "battery": "48V 15Ah", "charge_time": "4-5 hours"}'
),
(
  'Volt Pro 750W E-Bike',
  'volt-pro-750w',
  'মাউন্টেন-রেডি ইলেকট্রিক বাইক। ফুল সাসপেনশন, 750W মোটর এবং 120km রেঞ্জ সহ যেকোনো পথে যাওয়ার সক্ষমতা। হাইড্রোলিক ডিস্ক ব্রেক সহ।',
  125000, 140000, 'ebike',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  5, true,
  '{"range": "120km", "motor": "750W", "speed": "45kmh", "weight": "28kg", "battery": "52V 20Ah", "charge_time": "6-7 hours"}'
),
(
  'City Glide 250W',
  'city-glide-250w',
  'হালকা ওজনের ডেইলি কমিউটার ই-বাইক। অফিস থেকে বাজার — সব কাজে পারফেক্ট। সহজে ভাঁজ করা যায়।',
  55000, 62000, 'ebike',
  'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800',
  15, false,
  '{"range": "50km", "motor": "250W", "speed": "25kmh", "weight": "16kg", "battery": "36V 10Ah", "charge_time": "3 hours"}'
),
(
  'PowerCell 48V 20Ah Battery',
  'powercell-48v-20ah',
  'প্রিমিয়াম লিথিয়াম ব্যাটারি প্যাক। বেশিরভাগ ই-বাইকের সাথে কম্প্যাটিবল। BMS সুরক্ষা এবং 1000+ চার্জ সাইকেল।',
  18500, 22000, 'battery',
  'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
  25, true,
  '{"voltage": "48V", "capacity": "20Ah", "cycles": "1000+", "weight": "4.5kg", "type": "Li-Ion", "protection": "BMS"}'
),
(
  'UltraCell 60V 30Ah',
  'ultracell-60v-30ah',
  'হেভি-ডিউটি ব্যাটারি প্যাক। দীর্ঘ দূরত্বের জন্য আদর্শ। ওয়াটারপ্রুফ কেসিং সহ।',
  32000, 38000, 'battery',
  'https://images.unsplash.com/photo-1609092486657-6bb1a78c6e5a?w=800',
  12, true,
  '{"voltage": "60V", "capacity": "30Ah", "cycles": "1200+", "weight": "7kg", "type": "LiFePO4", "protection": "IP65"}'
),
(
  'EV Controller 36V 15A',
  'ev-controller-36v',
  'ব্রাশলেস মোটর কন্ট্রোলার রিজেনারেটিভ ব্রেকিং সহ। সব ধরনের BLDC মোটরের সাথে কম্প্যাটিবল।',
  4500, null, 'parts',
  'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800',
  50, false,
  '{"voltage": "36V", "current": "15A", "type": "Brushless", "phases": "3", "halls": "Yes"}'
),
(
  'BLDC Hub Motor 500W',
  'bldc-hub-motor-500w',
  'উচ্চ-দক্ষতার হাব মোটর। 26 ইঞ্চি চাকার জন্য ডিজাইন করা। সাইলেন্ট অপারেশন।',
  8500, 10000, 'parts',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
  30, false,
  '{"power": "500W", "voltage": "48V", "rpm": "380", "wheel_size": "26 inch", "torque": "45Nm"}'
),
(
  'Smart Helmet Pro',
  'smart-helmet-pro',
  'অ্যারোডায়নামিক হেলমেট LED টেইললাইট এবং ব্লুটুথ স্পিকার সহ। CE সার্টিফাইড। সব সাইজে পাওয়া যায়।',
  6500, 8000, 'accessories',
  'https://images.unsplash.com/photo-1558618047-3e84c2ff25e1?w=800',
  30, true,
  '{"sizes": "S/M/L/XL", "certification": "CE", "features": "LED+BT", "weight": "280g"}'
),
(
  'Fast Charger 5A Universal',
  'fast-charger-5a',
  'ইউনিভার্সাল ফাস্ট চার্জার 36V এবং 48V লিথিয়াম ব্যাটারির জন্য। ওভারচার্জ প্রটেকশন সহ।',
  3200, null, 'accessories',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
  80, false,
  '{"output": "5A", "compatible": "36V/48V", "protection": "OCP/OVP/SCP", "plug": "XLR"}'
),
(
  'Anti-Theft GPS Lock',
  'anti-theft-gps-lock',
  'স্মার্ট লক যা GPS ট্র্যাকিং এবং চোর এলার্ম সহ আসে। মোবাইল অ্যাপ দিয়ে কন্ট্রোল করা যায়।',
  4800, 5500, 'accessories',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  45, true,
  '{"gps": "Yes", "alarm": "110dB", "app": "iOS/Android", "battery": "Built-in 6mo"}'
)
ON CONFLICT (slug) DO NOTHING;
