using Backend.Domain.Entities;
using Backend.Domain.Services.Interfaces;
using Backend.Infrastructure.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Backend.Infrastructure.Persistence;

public static class AppDbSeeder
{
    public static async Task SeedAdminAsync(IServiceProvider services, CancellationToken ct = default)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();
        var adminSeed = scope.ServiceProvider
            .GetRequiredService<IOptions<AdminSeedOptions>>().Value;

        await db.Database.MigrateAsync(ct);

        // 1) Rol ADMIN
        var adminRole = await db.Roles
            .FirstOrDefaultAsync(r => r.Name == "ADMIN", ct);

        if (adminRole is null)
        {
            adminRole = new Role
            {
                Id = Guid.NewGuid(),
                Name = "ADMIN",
                Description = "Rol administrador"
            };
            db.Roles.Add(adminRole);
        }

        var permissionsData = new[]
        {
            new { Code = "administrar-permisos", Name = "Administrar permisos" },
            new { Code = "administrar-roles",    Name = "Administrar roles" },
            new { Code = "administrar-usuarios", Name = "Administrar usuarios" },
        };

        var permEntities = new List<Permission>();

        foreach (var p in permissionsData)
        {
            var perm = await db.Permissions
                .FirstOrDefaultAsync(x => x.Code == p.Code, ct);

            if (perm is null)
            {
                perm = new Permission
                {
                    Id = Guid.NewGuid(),
                    Code = p.Code,
                    Name = p.Name
                };
                db.Permissions.Add(perm);
            }

            permEntities.Add(perm);
        }

        foreach (var perm in permEntities)
        {
            var exists = await db.RolePermissions
                .AnyAsync(rp => rp.RoleId == adminRole.Id && rp.PermissionId == perm.Id, ct);

            if (!exists)
            {
                db.RolePermissions.Add(new RolePermission
                {
                    RoleId = adminRole.Id,
                    PermissionId = perm.Id
                });
            }
        }

        // datos del admin leidos de AdminSeed
        var adminEmail = adminSeed.Email;

        var adminUser = await db.Users
            .Include(u => u.UserRoles)
            .FirstOrDefaultAsync(u => u.Email == adminEmail, ct);

        if (adminUser is null)
        {
            var hashed = passwordHasher.Hash(adminSeed.Password);
            adminUser = new User(
                name: adminSeed.Name,
                email: adminEmail,
                password: hashed
            );

            db.Users.Add(adminUser);
        }

        var hasAdminRole = adminUser.UserRoles.Any(ur => ur.RoleId == adminRole.Id);

        if (!hasAdminRole)
        {
            adminUser.UserRoles.Add(new UserRole
            {
                UserId = adminUser.Id,
                RoleId = adminRole.Id
            });
        }

        await db.SaveChangesAsync(ct);
    }
}
