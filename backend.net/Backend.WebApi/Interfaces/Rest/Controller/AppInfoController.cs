using Backend.Infrastructure.Configuration;
using Backend.WebApi.Interfaces.Rest.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Annotations;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("/")]
public sealed class AppInfoController : ControllerBase
{
    private readonly AppInfoOptions _appInfo;

    public AppInfoController(IOptions<AppInfoOptions> appInfoOptions)
    {
        _appInfo = appInfoOptions.Value;
    }

    [HttpGet]
    [AllowAnonymous]
    [SwaggerOperation(
        Summary = "Informe del sistema",
        Description = "Este endpoint retorna la informaciond el estudiante y su sistema")]
    // [SwaggerResponse(StatusCodes.Status200OK,
    //     "Usuario registrado correctamente",
    //     typeof(AuthResponseDto))]
    // [SwaggerResponse(StatusCodes.Status400BadRequest,
    //     "Datos invalidos o request mal formado")]
    // [SwaggerResponse(StatusCodes.Status409Conflict,
    //     "Ya existe un usuario con el mismo email")]
    public IActionResult Get()
    {
        var resp = new
        {
            system = _appInfo.SystemName,
            version = _appInfo.Version,
            developer = _appInfo.Developer
        };

        return Ok(resp);
    }
}
