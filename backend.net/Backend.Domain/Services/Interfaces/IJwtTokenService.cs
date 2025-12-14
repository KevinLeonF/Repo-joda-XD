
using Backend.Domain.Entities;
namespace Backend.Domain.Services.Interfaces;
public interface IJwtTokenService
{
    string CreateToken(User user);
}