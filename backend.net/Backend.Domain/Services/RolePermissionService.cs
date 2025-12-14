namespace Backend.Infrastructure.Services;

using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Domain.Services.Interfaces;

public sealed class RolePermissionService : IRolePermissionService
{
    private readonly IRolePermissionRepository _repo;

    public RolePermissionService(IRolePermissionRepository repo)
    {
        _repo = repo;
    }

    public async Task<Role> CreateRoleAsync(string name, string? description, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("role name is required", nameof(name));

        var exists = await _repo.ExistsByNameRoleAsync(name, ct);
        if (exists)
            throw new InvalidOperationException($"role '{name}' already exists");

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description
        };

        await _repo.AddRoleAsync(role, ct);
        await _repo.SaveChangesRoleAsync(ct);

        return role;
    }

    public async Task<Permission> CreatePermissionAsync(string code, string name, string? description, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(code))
            throw new ArgumentException("permission code is required", nameof(code));

        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("permission name is required", nameof(name));

        var exists = await _repo.ExistsByCodePermissionAsync(code, ct);
        if (exists)
            throw new InvalidOperationException($"permission '{code}' already exists");

        var permission = new Permission
        {
            Id = Guid.NewGuid(),
            Code = code,
            Name = name,
            Description = description
        };

        await _repo.AddPermissionAsync(permission, ct);
        await _repo.SaveChangesPermissionAsync(ct);

        return permission;
    }

    public async Task AssignPermissionToRoleAsync(string roleName, string permissionCode, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(roleName))
            throw new ArgumentException("role name is required", nameof(roleName));

        if (string.IsNullOrWhiteSpace(permissionCode))
            throw new ArgumentException("permission code is required", nameof(permissionCode));

        var role = await _repo.GetByNameRoleAsync(roleName, ct)
                ?? throw new InvalidOperationException($"role '{roleName}' does not exist");

        var permission = await _repo.GetByCodePermissionAsync(permissionCode, ct)
                ?? throw new InvalidOperationException($"permission '{permissionCode}' does not exist");

        var already = role.RolePermissions.Any(rp => rp.PermissionId == permission.Id);
        if (already)
            return;

        role.RolePermissions.Add(new RolePermission
        {
            RoleId = role.Id,
            PermissionId = permission.Id
        });

        await _repo.SaveChangesRoleAsync(ct);
    }
}
