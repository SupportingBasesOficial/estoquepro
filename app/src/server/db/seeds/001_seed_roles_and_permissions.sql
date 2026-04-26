insert into roles (code, name, description, status)
values
  ('owner_admin', 'Dono/Admin', 'Controle total do sistema no nascimento inicial.', 'active'),
  ('operator', 'Operador', 'Operacao inicial com permissao de consulta de cadastros autorizados.', 'active'),
  ('viewer', 'Visualizacao', 'Consulta de informacoes autorizadas sem alteracao de dados.', 'active')
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status,
  updated_at = now();

insert into permissions (code, name, description)
values
  ('users.manage', 'Gerenciar usuarios', 'Criar e administrar usuarios.'),
  ('roles.view', 'Visualizar papeis', 'Consultar papeis do sistema.'),
  ('permissions.view', 'Visualizar permissoes', 'Consultar permissoes do sistema.'),
  ('products.create', 'Criar produtos', 'Cadastrar novos produtos.'),
  ('products.update', 'Alterar produtos', 'Alterar dados de produtos.'),
  ('products.view', 'Visualizar produtos', 'Consultar produtos.'),
  ('products.deactivate', 'Inativar produtos', 'Inativar produtos sem excluir historico.'),
  ('categories.manage', 'Gerenciar categorias', 'Criar e alterar categorias.'),
  ('categories.view', 'Visualizar categorias', 'Consultar categorias.'),
  ('suppliers.manage', 'Gerenciar fornecedores', 'Criar e alterar fornecedores.'),
  ('suppliers.view', 'Visualizar fornecedores', 'Consultar fornecedores.'),
  ('locations.manage', 'Gerenciar localizacoes', 'Criar e alterar localizacoes internas.'),
  ('locations.view', 'Visualizar localizacoes', 'Consultar localizacoes internas.'),
  ('audit.view', 'Visualizar auditoria', 'Consultar logs administrativos.')
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description;

insert into role_permissions (role_id, permission_id)
select roles.id, permissions.id
from roles
cross join permissions
where roles.code = 'owner_admin'
on conflict (role_id, permission_id) do nothing;

insert into role_permissions (role_id, permission_id)
select roles.id, permissions.id
from roles
join permissions on permissions.code in (
  'products.view',
  'categories.view',
  'suppliers.view',
  'locations.view'
)
where roles.code in ('operator', 'viewer')
on conflict (role_id, permission_id) do nothing;
