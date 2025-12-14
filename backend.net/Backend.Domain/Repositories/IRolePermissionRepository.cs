namespace Backend.Domain.Repositories;

using Backend.Domain.Entities;

public interface IRolePermissionRepository
{
    ///ROLES///
    Task<Role?> GetByNameRoleAsync(string name, CancellationToken ct);
    Task<bool> ExistsByNameRoleAsync(string name, CancellationToken ct);
    Task AddRoleAsync(Role role, CancellationToken ct);
    Task<List<Role>> GetAllRolesAsync(CancellationToken ct);
    Task SaveChangesRoleAsync(CancellationToken ct);

    ///PERMISOS///
    /// 
    Task<Permission?> GetByCodePermissionAsync(string code, CancellationToken ct);
    Task<bool> ExistsByCodePermissionAsync(string code, CancellationToken ct);

    Task AddPermissionAsync(Permission permission, CancellationToken ct);
    Task SaveChangesPermissionAsync(CancellationToken ct);
}
