namespace Backend.Domain.Entities;

public class User
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; } = default!;
    public string Email { get; private set; } = default!;
    public string Password { get; private set; } = default!;
    public bool Active { get; set; } = true;
    public DateTime UpdateAt { get; private set; } = DateTime.UtcNow;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public User(string name, string email, string password)
    {
        this.Name = name;
        Email = email;
        this.Password = password;
    }
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
