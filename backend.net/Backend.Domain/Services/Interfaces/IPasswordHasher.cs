namespace Backend.Domain.Services.Interfaces;

public interface IPasswordHasher
{
    string Hash(string plain);
    bool Verify(string plain, string hash);
}
