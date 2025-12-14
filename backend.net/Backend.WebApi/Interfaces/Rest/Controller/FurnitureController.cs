﻿namespace Backend.WebApi.Interfaces.Rest.Controller;

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
public class FurnitureController(IFurnitureService service) : ControllerBase
{
    [HttpPost("crear-mueble")]
    public async Task<ActionResult<FurnitureResponseDto>> CreateFurniture([FromBody] FurnitureCreateDto furnitureDto, CancellationToken ct)
    {
        try
        {
            var newFurniture = await service.CreateFurnitureServiceAsync(furnitureDto.Name, furnitureDto.Price, furnitureDto.CategorieId, ct);
            var resp = FurnitureMapper.Tranformar_a_responseDto(newFurniture);
            return resp;
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
    [HttpGet("listar-muebles")]
    public async Task<ActionResult<IEnumerable<FurnitureResponseDto>>> GetAllProducts(CancellationToken ct)
    {
        var producs = await service.ListAllFurnitures(ct);
        return Ok(producs.Select(FurnitureMapper.Tranformar_a_responseDto));
    }


    [Produces("application/json")]
    [ProducesResponseType(typeof(FurnitureResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]

    [HttpGet("recuperar-mueble-id")]
    public async Task<ActionResult<FurnitureResponseDto>> GetByIdFurniture([FromQuery] Guid mueble_id, CancellationToken ct)
    {
        try
        {
            var furniture = await service.GetByIdFurnitureAsync(mueble_id, ct);
            if (furniture is null) return NotFound();
            return Ok(FurnitureMapper.Tranformar_a_responseDto(furniture));
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

    [HttpPut("actualizar-mueble-por-id")]
    public async Task<ActionResult<FurnitureResponseDto>> UpdateFurnitureComplete(Guid muebleId, [FromBody] FurnitureUpdateDto furnitureUpdate, CancellationToken ct)
    {
        try
        {
            var updateFurniture = await service.UpdateCompleteFurnitureAsync(muebleId, furnitureUpdate.updateName, furnitureUpdate.ActuaizarPrecio, ct);
            return Ok(FurnitureMapper.Tranformar_a_responseDto(updateFurniture));
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

    [HttpPatch("actualizar-precio-mueble-id")]
    public async Task<ActionResult<FurnitureResponseDto>> UpdateFurniturePrice(Guid muebleId, [FromBody] FurnitureUpdatePriceDto furniturePrice, CancellationToken ct)
    {
        try
        {
            var updateFurniture = await service.ActuaizarPrecioFurnitureAsync(muebleId, furniturePrice.Precio, ct);
            return Ok(FurnitureMapper.Tranformar_a_responseDto(updateFurniture));
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

    [HttpDelete("eliminar-mueble-id")]
    public async Task<ActionResult<FurnitureResponseDto>> DeleteFurnitureId(Guid muebleId, CancellationToken ct)
    {
        try
        {
            var furniture = await service.DeleteFurnitureLogicAsync(muebleId, ct);
            if (furniture is null) return NotFound();
            return Ok(FurnitureMapper.Tranformar_a_responseDto(furniture));
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

    [HttpPatch("reactivar-mueble-id")]
    public async Task<ActionResult<FurnitureResponseDto>> ReactivateFurniture([FromQuery] Guid muebleId, CancellationToken ct)
    {
        try
        {
            var furniture = await service.ReactivateFurnitureAsync(muebleId, ct);
            return Ok(FurnitureMapper.Tranformar_a_responseDto(furniture));
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


