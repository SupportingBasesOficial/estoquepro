create extension if not exists pgcrypto;

create table roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint roles_status_check check (status in ('active', 'inactive'))
);

create table permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table role_permissions (
  role_id uuid not null references roles(id) on delete restrict,
  permission_id uuid not null references permissions(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (role_id, permission_id)
);

create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  email_normalized text generated always as (lower(btrim(email))) stored,
  password_hash text not null,
  role_id uuid not null references roles(id) on delete restrict,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_status_check check (status in ('active', 'inactive')),
  constraint users_email_normalized_unique unique (email_normalized)
);

create index users_role_id_idx on users(role_id);
