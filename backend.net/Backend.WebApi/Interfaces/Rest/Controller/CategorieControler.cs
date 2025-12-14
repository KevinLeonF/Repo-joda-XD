namespace Backend.WebApi.Interfaces.Rest.Controller;

using Microsoft.AspNetCore.Mvc;
using Backend.Domain.Services;
using Backend.WebApi.Interfaces.Rest.Dto;
using Backend.WebApi.Interfaces.Rest.Mapper;
using Backend.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Backend.Domain.Common;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class CategorieController(ICategorieService categorieService) : ControllerBase
{
    [HttpPost("crear-categoria")]
  
    public async Task<ActionResult<CategorieResponseDto>> CreateCategorie([FromBody] CategorieCreateDto categorieCreateDto, CancellationToken ct = default)
    {
        try
        {
            var newCategorie = await categorieService.CreateCategorieServiceAsync(categorieCreateDto.name, categorieCreateDto.description, ct);
            var resp = CategorieMapper.entityToDto(newCategorie);
            return Ok(resp);
        }
        catch (ArgumentException ex)
        {
            return ValidationProblem(detail: ex.Message);
        }
    }

    [HttpGet("listar-categorias")]
    public async Task<ActionResult<IEnumerable<CategorieResponseDto>>> GetAllCategories(CancellationToken ct)
    {
        var categories = await categorieService.ListAllCategoriesAsync(ct);
        return Ok(categories.Select(CategorieMapper.entityToDto));
    }

    [HttpGet("recuperar-categoria-id")]
    public async Task<ActionResult<CategorieResponseDto>> GetCategorieById([FromQuery] Guid categorieId, CancellationToken ct)
    {
        try
        {
            var categorie = await categorieService.GetCategorieByIdAsync(categorieId, ct);
            if (categorie is null) return NotFound();
            return Ok(CategorieMapper.entityToDto(categorie));
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

    [HttpPut("actualizar-por-id")]
   
    public async Task<ActionResult<CategorieResponseDto>> UpdateCategorieComplete([FromQuery] Guid categorieId, [FromBody] CategorieUpdateDto categorieUpdate, CancellationToken ct)
    {
        try
        {
            var updateCategorie = await categorieService.UpdateCompleteCategorieAsync(categorieId, categorieUpdate.name, categorieUpdate.description, ct);
            return Ok(CategorieMapper.entityToDto(updateCategorie));
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

    [HttpDelete("eliminar-categoria-id")]
    public async Task<ActionResult<CategorieResponseDto>> DeleteCategorieId([FromQuery] Guid categorieId, CancellationToken ct)
    {
        try
        {
            var categorie = await categorieService.DeleteCategorieLogicAsync(categorieId, ct);
            if (categorie is null) return NotFound();
            return Ok(CategorieMapper.entityToDto(categorie));
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

    [HttpPatch("reactivar-categoria-id")]
    public async Task<ActionResult<CategorieResponseDto>> ReactivateCategorie([FromQuery] Guid categorieId, CancellationToken ct)
    {
        try
        {
            var categorie = await categorieService.ReactivateCategorieAsync(categorieId, ct);
            return Ok(CategorieMapper.entityToDto(categorie));
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
