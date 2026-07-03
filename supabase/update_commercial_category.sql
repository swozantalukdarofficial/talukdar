-- Add 'commercial' to the allowed categories in the products table
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check CHECK (category IN ('ebike', 'battery', 'parts', 'accessories', 'solar', 'commercial'));
