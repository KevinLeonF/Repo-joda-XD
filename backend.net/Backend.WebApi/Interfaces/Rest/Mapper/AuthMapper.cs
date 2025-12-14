namespace Backend.WebApi.Interfaces.Rest.Mapper;

using Backend.Domain.Entities;
using Backend.Domain.Services.Interfaces;
using Backend.WebApi.Interfaces.Rest.Dto;

public class AuthMapper
{
    public static AuthResponseDto userEntityToUserDto(AuthResult authResult)
    {
        return new(authResult.Token, authResult.UserId, authResult.name, authResult.email);
    }
}
