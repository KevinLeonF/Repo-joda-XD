namespace Backend.Domain.Services;

using Backend.Domain.Repositories;
using Backend.Domain.Services.Interfaces;
using Backend.Domain.Entities;
public class UserService(IUserRepository userRepository, IRolePermissionRepository roles, IPasswordHasher passwordHasher) : IUserService
{
    public async Task<User> RegisterUserAsync(string name, string email, string password, CancellationToken ct = default)
    {
        var checkExitsUser = await userRepository.ExistsUserByEmailAsync(email, ct);
        if (checkExitsUser)
        {
            throw new InvalidCastException("Correo electronio ya existente");
        }
        var hashPassword = passwordHasher.Hash(password);
        var newUser = new User(name, email, hashPassword);
        await userRepository.CreateUserAsync(newUser, ct);
        return newUser;
    }

    public async Task<User?> FindByEmailAsync(string email, CancellationToken ct = default)
    {
        var getUser = await userRepository.FindUserByEmailAsync(email, ct);
        return getUser;
    }


    public async Task<User> LoginAsync(string email, string password, CancellationToken ct = default)
    {
        var user = await userRepository.GetByEmailWithRolesAsync(email, ct);
        if (user is null)
        {
            throw new UnauthorizedAccessException();
        }
        // var user = await userRepository.FindUserByEmailAsync(email, ct) ?? throw new UnauthorizedAccessException();
        if (!passwordHasher.Verify(password, user.Password))
        {
            throw new UnauthorizedAccessException();
        }
        
        return user;
    }

    public async Task AssignRoleAsync(Guid userId, IReadOnlyCollection<string> roleNames, CancellationToken ct)
    {
        var user = await userRepository.GetByIdWithRolesAsync(userId, ct)
                   ?? throw new InvalidOperationException("Usuario no encontrado");

        // normalizar nombres (ej: ADMIN, User -> ADMIN)
        var normalizedNames = (roleNames ?? Array.Empty<string>())
            .Where(n => !string.IsNullOrWhiteSpace(n))
            .Select(n => n.Trim().ToUpperInvariant())
            .Distinct()
            .ToList();

        // si la lista viene vacia, simplemente limpiamos roles
        if (normalizedNames.Count == 0)
        {
            user.UserRoles.Clear();
            await userRepository.SaveChangesAsync(ct);
            return;
        }

        // cargar roles uno por uno usando tu metodo actual
        var rolesToAssign = new List<Role>();
        foreach (var roleName in normalizedNames)
        {
            var role = await roles.GetByNameRoleAsync(roleName, ct);
            if (role is null)
            {
                // puedes cambiar esto por tu propia excepcion de dominio
                throw new InvalidOperationException($"Rol '{roleName}' no existe");
            }

            rolesToAssign.Add(role);
        }

        // limpiar roles actuales
        user.UserRoles.Clear();

        // asignar solo los nuevos
        foreach (var role in rolesToAssign)
        {
            user.UserRoles.Add(new UserRole
            {
                UserId = user.Id,
                RoleId = role.Id
            });
        }

        await userRepository.SaveChangesAsync(ct);
    }

}
