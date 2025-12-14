namespace Backend.Domain.Repositories;

using Backend.Domain.Entities;
public interface IUserRepository
{
    Task<bool> ExistsUserByEmailAsync(string email, CancellationToken ct = default);
    Task<User?> FindUserByEmailAsync(string email, CancellationToken ct = default);
    Task<User> CreateUserAsync(User user, CancellationToken ct = default);

    Task<User?> GetByEmailWithRolesAsync(string email, CancellationToken ct);
    Task<User?> GetByIdWithRolesAsync(Guid id, CancellationToken ct);
    Task SaveChangesAsync(CancellationToken ct);
}