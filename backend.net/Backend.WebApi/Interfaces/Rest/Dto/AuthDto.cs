using System.ComponentModel.DataAnnotations;

namespace Backend.WebApi.Interfaces.Rest.Dto;

public sealed record UserResponseDto(Guid UserId, string Name, string Email);
public sealed record AuthResponseDto(string Token, string UserId, string Name, string Email);
public sealed record RegisterUserDto(
    [Required, MinLength(1)]
    string Name,
    [Required, MinLength(1),EmailAddress(ErrorMessage = "Por favor introduzca un correo electronico valido")]
    string Email,
    [Required, MinLength(8,ErrorMessage="El password debe tener minimo 8 caracteres")]
    string Password
);
public sealed record LoginRequestDto(string Email, string Password);



