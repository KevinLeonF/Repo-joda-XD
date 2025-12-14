
namespace Backend.Infrastructure.Repositories;

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public sealed class RolePermissionRepositoryEf : IRolePermissionRepository
{
    private readonly AppDbContext database;

    public RolePermissionRepositoryEf(AppDbContext db)
    {
        database = db;
    }

    ///ROLES

    public Task<Role?> GetByNameRoleAsync(string name, CancellationToken ct)
    {
        var normalized = name.Trim().ToUpperInvariant();

        return database.Roles
            .Include(r => r.RolePermissions)
                .ThenInclude(rp => rp.Permission)
            .SingleOrDefaultAsync(r => r.Name == normalized, ct);
    }

    public Task<bool> ExistsByNameRoleAsync(string name, CancellationToken ct)
    {
        var normalized = name.Trim().ToUpperInvariant();
        return database.Roles.AnyAsync(r => r.Name == normalized, ct);
    }

    public async Task AddRoleAsync(Role role, CancellationToken ct)
    {
        role.Name = role.Name.Trim().ToUpperInvariant();
        Console.WriteLine(role.Name);
        await database.Roles.AddAsync(role, ct);
    }

    public Task<List<Role>> GetAllRolesAsync(CancellationToken ct)
    {
        return database.Roles
            .Include(r => r.RolePermissions)
                .ThenInclude(rp => rp.Permission)
            .ToListAsync(ct);
    }

    public Task SaveChangesRoleAsync(CancellationToken ct)
    {
        return database.SaveChangesAsync(ct);
    }

    ///PERMISOS

    public Task<Permission?> GetByCodePermissionAsync(string code, CancellationToken ct)
    {
        var normalized = code.Trim().ToLowerInvariant();
        return database.Permissions.SingleOrDefaultAsync(p => p.Code == normalized, ct);
    }

    public Task<bool> ExistsByCodePermissionAsync(string code, CancellationToken ct)
    {
        var normalized = code.Trim().ToLowerInvariant();
        return database.Permissions.AnyAsync(p => p.Code == normalized, ct);
    }

    public async Task AddPermissionAsync(Permission permission, CancellationToken ct)
    {
        // normalizamos el code aqui tambien
        permission.Code = permission.Code.Trim().ToLowerInvariant();
        await database.Permissions.AddAsync(permission, ct);
    }

    public Task SaveChangesPermissionAsync(CancellationToken ct)
    {
        return database.SaveChangesAsync(ct);
    }
}
