using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence;

public class UserRepositoryEf : IUserRepository
{
    private readonly AppDbContext database;
    public UserRepositoryEf(AppDbContext db)
    {
        this.database = db;
    }
    public async Task<User> CreateUserAsync(User user, CancellationToken ct = default)
    {
        await database.AddAsync(user, ct);
        await database.SaveChangesAsync(ct);
        return user;
    }

    public async Task<bool> ExistsUserByEmailAsync(string email, CancellationToken ct = default)
    {
        return await database.Users.AnyAsync(user => user.Email == email.ToLower(), ct);
    }

    public async Task<User?> FindUserByEmailAsync(string email, CancellationToken ct = default)
    {
        return await database.Users.AsNoTracking().FirstOrDefaultAsync(user => user.Email == email && user.Active, ct);
    }

    public async Task<User?> GetByEmailWithRolesAsync(string email, CancellationToken ct)
    {
        return await database.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                    .ThenInclude(r => r.RolePermissions)
                        .ThenInclude(rp => rp.Permission)
            .SingleOrDefaultAsync(u => u.Email == email, ct);
    }

    public async Task<User?> GetByIdWithRolesAsync(Guid id, CancellationToken ct)
    {
        return await database.Users
        .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
                .ThenInclude(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission)
        .SingleOrDefaultAsync(u => u.Id == id, ct);
    }

    public Task SaveChangesAsync(CancellationToken ct)
    {
        return database.SaveChangesAsync(ct);
    }
}

