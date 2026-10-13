-- ================================================================
-- Refund tracking for orders.
-- Run ONCE in the Supabase SQL Editor (Dashboard -> SQL Editor).
-- No payment-gateway reversal — this just records refunds in the DB.
-- ================================================================

alter table orders
  add column if not exists refunded_amount numeric not null default 0;

alter table orders
  add column if not exists refunded_at timestamptz;

alter table orders
  add column if not exists refund_reason text;

-- Widen the status check to allow 'refunded' (and the statuses the
-- admin panel actually uses: processing, completed).
alter table orders drop constraint if exists orders_status_check;
alter table orders
  add constraint orders_status_check
  check (status in (
    'pending','confirmed','processing','shipped',
    'delivered','completed','cancelled','refunded'
  ));

create index if not exists idx_orders_refunded_at on orders (refunded_at);
