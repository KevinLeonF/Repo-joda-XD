namespace Backend.Domain.Services.Interfaces;

using Backend.Domain.Entities;
public interface IRolePermissionService
{
    Task<Role> CreateRoleAsync(string name, string? description, CancellationToken ct);
    Task<Permission> CreatePermissionAsync(string code, string name, string? description, CancellationToken ct);
    Task AssignPermissionToRoleAsync(string roleName, string permissionCode, CancellationToken ct);
}
