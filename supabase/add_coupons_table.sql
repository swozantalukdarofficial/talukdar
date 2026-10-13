-- ================================================================
-- Real coupon system for the /admin/coupons page.
-- Run ONCE in the Supabase SQL Editor (Dashboard -> SQL Editor).
-- ================================================================

create table if not exists coupons (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  type        text not null check (type in ('percent','fixed')),
  value       numeric not null check (value > 0),
  min_order   numeric not null default 0,
  max_uses    int,
  used_count  int not null default 0,
  expires_at  timestamptz,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table coupons enable row level security;

-- Admin management: only allowlisted admin emails (via their Supabase Auth JWT).
drop policy if exists "Allowlisted admins manage coupons" on coupons;
create policy "Allowlisted admins manage coupons"
  on coupons for all
  to authenticated
  using (
    lower(auth.jwt() ->> 'email') in (
      'shipontalukdaroffice@gmail.com',
      'swozantalukdaofficial@gmail.com'
    )
  )
  with check (
    lower(auth.jwt() ->> 'email') in (
      'shipontalukdaroffice@gmail.com',
      'swozantalukdaofficial@gmail.com'
    )
  );

-- Public checkout needs to validate active coupons server-side
-- (the validate API only reads active rows; codes are promotional/public anyway).
drop policy if exists "Public read active coupons" on coupons;
create policy "Public read active coupons"
  on coupons for select
  to anon
  using (is_active = true);

create index if not exists coupons_code_idx on coupons (lower(code));

-- Store the applied coupon on the order so the invoice math stays correct.
alter table orders add column if not exists coupon_code text;
alter table orders add column if not exists discount_amount numeric not null default 0;

-- ================================================================
-- Secure redemption: increments used_count only for a real, recent
-- order. SECURITY DEFINER so it works without a service-role key,
-- callable by anyone but useless without a fresh order id.
-- ================================================================
create or replace function redeem_coupon(p_code text, p_order_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_created timestamptz;
  v_count   int;
  v_max     int;
begin
  -- The order must exist and be fresh (placed within the last 30 minutes).
  select created_at into v_created from orders where id = p_order_id;
  if v_created is null or v_created < now() - interval '30 minutes' then
    return false;
  end if;

  select used_count, max_uses into v_count, v_max
  from coupons
  where lower(code) = lower(p_code) and is_active = true;

  if v_count is null then
    return false;
  end if;
  if v_max is not null and v_count >= v_max then
    return false;
  end if;

  update coupons
  set used_count = used_count + 1
  where lower(code) = lower(p_code);

  return true;
end;
$$;

grant execute on function redeem_coupon(text, uuid) to anon;
grant execute on function redeem_coupon(text, uuid) to authenticated;
