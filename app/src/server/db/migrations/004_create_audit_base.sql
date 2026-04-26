create table admin_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  occurred_at timestamptz not null default now(),
  summary text,
  payload jsonb
);

create index admin_logs_occurred_at_idx on admin_logs(occurred_at);
create index admin_logs_entity_idx on admin_logs(entity);
create index admin_logs_user_id_idx on admin_logs(user_id);

create function prevent_admin_logs_update_delete()
returns trigger
language plpgsql
as $$
begin
  raise exception 'admin_logs is append-only';
end;
$$;

create trigger admin_logs_prevent_update
before update on admin_logs
for each row execute function prevent_admin_logs_update_delete();

create trigger admin_logs_prevent_delete
before delete on admin_logs
for each row execute function prevent_admin_logs_update_delete();
