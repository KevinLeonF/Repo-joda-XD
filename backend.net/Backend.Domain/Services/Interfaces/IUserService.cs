namespace Backend.Domain.Services.Interfaces;

using Backend.Domain.Entities;
public interface IUserService
{
    Task<User> RegisterUserAsync(string name, string email, string password, CancellationToken ct = default);

    Task<User> LoginAsync(string email, string password, CancellationToken ct = default);

    Task<User?> FindByEmailAsync(string email, CancellationToken ct = default);

    Task AssignRoleAsync(Guid userId, IReadOnlyCollection<string> roleNames, CancellationToken ct);
}

