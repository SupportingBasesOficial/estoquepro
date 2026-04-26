create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_status_check check (status in ('active', 'inactive'))
);

create table suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  contact_name text,
  document text,
  notes text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint suppliers_status_check check (status in ('active', 'inactive'))
);

create unique index suppliers_document_unique_idx
  on suppliers(document)
  where document is not null;

create table internal_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint internal_locations_status_check check (status in ('active', 'inactive'))
);

create table products (
  id uuid primary key default gen_random_uuid(),
  internal_code text not null unique,
  name text not null,
  description text,
  category_id uuid not null references categories(id) on delete restrict,
  primary_supplier_id uuid not null references suppliers(id) on delete restrict,
  internal_location_id uuid references internal_locations(id) on delete set null,
  cost_price numeric(12,2) not null,
  sale_price numeric(12,2) not null,
  minimum_stock numeric(12,3) not null default 0,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_cost_price_non_negative check (cost_price >= 0),
  constraint products_sale_price_non_negative check (sale_price >= 0),
  constraint products_minimum_stock_non_negative check (minimum_stock >= 0),
  constraint products_status_check check (status in ('active', 'inactive'))
);

create index products_category_id_idx on products(category_id);
create index products_primary_supplier_id_idx on products(primary_supplier_id);
create index products_internal_location_id_idx on products(internal_location_id);
