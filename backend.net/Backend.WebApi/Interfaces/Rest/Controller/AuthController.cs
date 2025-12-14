namespace Backend.WebApi.Interfaces.Rest.Controller;

using System.Security.Claims;
using Backend.Domain.Common;
using Backend.Domain.Services.Interfaces;
using Backend.WebApi.Interfaces.Rest.Dto;
using Backend.WebApi.Interfaces.Rest.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]

public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("registrar-usuario")]
    [Authorize]

    public async Task<ActionResult<UserResponseDto>> RegisterUser([FromBody] RegisterUserDto registerUserDto, CancellationToken ct)
    {
        try
        {
            var newUser = await authService.RegisterUserAsync(registerUserDto.Name, registerUserDto.Email, registerUserDto.Password, ct);
            return Ok(AuthMapper.userEntityToUserDto(newUser));

        }
        catch (NotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return ValidationProblem(detail: ex.Message);
        }
    }

    [HttpPost("inicio-sesion")]
    [AllowAnonymous]

    public async Task<ActionResult<UserResponseDto>> LoginAsycn([FromBody] LoginRequestDto loginRequestDto, CancellationToken ct)
    {
        try
        {
            var newUser = await authService.LoginUser(loginRequestDto.Email, loginRequestDto.Password, ct);
            return Ok(AuthMapper.userEntityToUserDto(newUser));

        }
        catch (NotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return ValidationProblem(detail: ex.Message);
        }
    }
}
