-- ============================================================
-- Restaurant Inventory System — Database Schema
-- Run in Supabase SQL editor
-- ============================================================

-- 1. INGREDIENTS TABLE
create table if not exists public.ingredients (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  current_qty  numeric(10, 2) not null default 0,
  min_limit    numeric(10, 2) not null default 0,
  unit         text not null,           -- e.g. kg, bags, pcs, L
  bulk_unit    text,                    -- label for quick-increment button e.g. "Bag (5kg)"
  bulk_qty     numeric(10, 2) default 1, -- how much one bulk unit represents
  location     text not null check (location in ('Maamoura Kitchen', 'Sheraton Shop')),
  created_at   timestamptz not null default now()
);

-- 2. USAGE LOGS TABLE
create table if not exists public.usage_logs (
  id             uuid primary key default gen_random_uuid(),
  ingredient_id  uuid not null references public.ingredients(id) on delete cascade,
  qty_deducted   numeric(10, 2) not null,
  staff_name     text not null,
  location       text not null check (location in ('Maamoura Kitchen', 'Sheraton Shop')),
  timestamp      timestamptz not null default now()
);

-- 3. TRIGGER FUNCTION — auto-deduct from current_qty on log insert
create or replace function public.deduct_ingredient_qty()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.ingredients
  set current_qty = current_qty - NEW.qty_deducted
  where id = NEW.ingredient_id;
  return NEW;
end;
$$;

-- 4. TRIGGER — fires after each usage_log insert
drop trigger if exists trg_deduct_on_log on public.usage_logs;
create trigger trg_deduct_on_log
  after insert on public.usage_logs
  for each row
  execute function public.deduct_ingredient_qty();

-- 5. PURCHASE ORDERS TABLE (manager action)
create table if not exists public.purchase_orders (
  id             uuid primary key default gen_random_uuid(),
  ingredient_id  uuid not null references public.ingredients(id) on delete cascade,
  requested_qty  numeric(10, 2) not null,
  status         text not null default 'pending' check (status in ('pending', 'ordered', 'received')),
  notes          text,
  created_at     timestamptz not null default now()
);

-- 6. ROW-LEVEL SECURITY (optional but recommended)
alter table public.ingredients   enable row level security;
alter table public.usage_logs    enable row level security;
alter table public.purchase_orders enable row level security;

-- Allow all authenticated users to read ingredients
create policy "ingredients_read_all" on public.ingredients
  for select using (true);

-- Allow all authenticated users to insert usage logs
create policy "usage_logs_insert_all" on public.usage_logs
  for insert with check (true);

create policy "usage_logs_read_all" on public.usage_logs
  for select using (true);

-- Allow all authenticated users to read/insert purchase orders
create policy "purchase_orders_all" on public.purchase_orders
  for all using (true);

-- Allow managers to update ingredients (restock)
create policy "ingredients_update_all" on public.ingredients
  for update using (true);
