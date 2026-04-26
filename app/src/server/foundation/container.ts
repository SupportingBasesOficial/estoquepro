import { AuthorizationService } from "../auth";
import { env } from "../config/env";
import {
  AuditLogService,
  CategoryService,
  LocationService,
  PermissionService,
  PgAuditLogRepository,
  PgCategoryRepository,
  PgLocationRepository,
  PgPermissionRepository,
  PgProductRepository,
  PgRoleRepository,
  PgSessionRepository,
  PgSupplierRepository,
  PgUserRepository,
  ProductService,
  RoleService,
  SessionService,
  SupplierService,
  UserService,
  type AuditLogRepository,
  type CategoryRepository,
  type LocationRepository,
  type PermissionRepository,
  type ProductRepository,
  type RoleRepository,
  type SessionRepository,
  type SupplierRepository,
  type UserRepository
} from "../modules";

export type FoundationRepositories = {
  auditLogs: AuditLogRepository;
  categories: CategoryRepository;
  locations: LocationRepository;
  permissions: PermissionRepository;
  products: ProductRepository;
  roles: RoleRepository;
  sessions: SessionRepository;
  suppliers: SupplierRepository;
  users: UserRepository;
};

export type FoundationServices = {
  auditLogs: AuditLogService;
  authorization: AuthorizationService;
  categories: CategoryService;
  locations: LocationService;
  permissions: PermissionService;
  products: ProductService;
  roles: RoleService;
  sessions: SessionService;
  suppliers: SupplierService;
  users: UserService;
};

export type FoundationContainer = {
  repositories: FoundationRepositories;
  services: FoundationServices;
};

export type FoundationContainerOptions = {
  repositories?: Partial<FoundationRepositories>;
  sessionTtlDays?: number;
};

export function createFoundationContainer(
  options: FoundationContainerOptions = {}
): FoundationContainer {
  const repositories: FoundationRepositories = {
    auditLogs: options.repositories?.auditLogs ?? new PgAuditLogRepository(),
    categories: options.repositories?.categories ?? new PgCategoryRepository(),
    locations: options.repositories?.locations ?? new PgLocationRepository(),
    permissions:
      options.repositories?.permissions ?? new PgPermissionRepository(),
    products: options.repositories?.products ?? new PgProductRepository(),
    roles: options.repositories?.roles ?? new PgRoleRepository(),
    sessions: options.repositories?.sessions ?? new PgSessionRepository(),
    suppliers: options.repositories?.suppliers ?? new PgSupplierRepository(),
    users: options.repositories?.users ?? new PgUserRepository()
  };

  const auditLogs = new AuditLogService(repositories.auditLogs);
  const roles = new RoleService(repositories.roles);

  const services: FoundationServices = {
    auditLogs,
    authorization: new AuthorizationService(roles),
    categories: new CategoryService(repositories.categories, auditLogs),
    locations: new LocationService(repositories.locations, auditLogs),
    permissions: new PermissionService(repositories.permissions),
    products: new ProductService(
      repositories.products,
      repositories.categories,
      repositories.suppliers,
      repositories.locations,
      auditLogs
    ),
    roles,
    sessions: new SessionService(repositories.sessions, {
      ttlDays: options.sessionTtlDays ?? env.SESSION_TTL_DAYS
    }),
    suppliers: new SupplierService(repositories.suppliers, auditLogs),
    users: new UserService(repositories.users, repositories.roles, auditLogs)
  };

  return { repositories, services };
}
