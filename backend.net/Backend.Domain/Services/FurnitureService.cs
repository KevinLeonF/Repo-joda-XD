﻿namespace Backend.Domain.Services;

using Backend.Domain.Repositories;
using Backend.Domain.Common;
using Backend.Domain.Entities;
using Backend.Domain.Services.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading;

public sealed class FurnitureService: IFurnitureService
{
    private readonly IFurnitureRepository repositoryFurniture;
    private readonly ICategorieRepository categorieRepository;
    public FurnitureService(IFurnitureRepository repositoryFurniture, ICategorieRepository categorieRepository)
    {
        this.repositoryFurniture =  repositoryFurniture;
        this.categorieRepository = categorieRepository;
    }
    public async Task<Furniture> CreateFurnitureServiceAsync(string name, decimal price, Guid categorieId, CancellationToken ct = default)
    {
        var checkExistCategorie = await categorieRepository.CheckExistCategorieById(categorieId);
        if (!checkExistCategorie)
        {
            throw new ArgumentException("Category does not exist", nameof(categorieId));
        }

        Console.WriteLine(name);
        Console.WriteLine(price);
        var newFurniture = new Furniture { Name = name.Trim(), Price = price, CategoryId = categorieId };
        await repositoryFurniture.CreateFurnitureAsync(newFurniture, ct);
        await repositoryFurniture.SaveChangesFurnitureAsync(ct);
        return newFurniture;
    }

    public Task<IReadOnlyList<Furniture>> ListAllFurnitures(CancellationToken ct = default) => repositoryFurniture.GetAllFurnituresAsync(ct);

    public async Task<Furniture?> GetByIdFurnitureAsync(Guid id, CancellationToken ct = default)
    {
        var getFurniture = await repositoryFurniture.GetByIdFurnitureAsync(id, ct);
        if (getFurniture is null) throw new NotFoundException("El mueble no existe");
        return getFurniture;
    }

    public async Task<Furniture> UpdateCompleteFurnitureAsync(Guid id, string name, decimal price, CancellationToken ct = default)
    {
        var getFurniture = await repositoryFurniture.GetByIdFurnitureAsync(id, ct);
        if (getFurniture is null) throw new NotFoundException("El mueble no existe");
        getFurniture.Name = name;
        getFurniture.Price = price;
        getFurniture.UpdatedAt = DateTime.UtcNow;
        await repositoryFurniture.UpdateCompleteFurnitureAsync(getFurniture, ct);
        return getFurniture;
    }

    public async Task<Furniture> ActuaizarPrecioFurnitureAsync(Guid id, decimal price, CancellationToken ct = default)
    {
        var getFurniture = await repositoryFurniture.GetByIdFurnitureAsync(id, ct);
        if (getFurniture is null) throw new NotFoundException("El mueble no existe");
        getFurniture.Price = price;
        getFurniture.UpdatedAt = DateTime.UtcNow;
        await repositoryFurniture.ActuaizarPrecioFurnitureAsync(getFurniture, ct);
        return getFurniture;

    }

    public async Task<Furniture> DeleteFurnitureLogicAsync(Guid id, CancellationToken ct = default)
    {
        var getFurniture = await repositoryFurniture.GetByIdFurnitureAsync(id, ct);
        if (getFurniture is null) throw new NotFoundException("El mueble no existe");
        getFurniture.Active = false;
        await repositoryFurniture.DeleteFurnitureAsync(getFurniture, ct);
        return getFurniture;
    }

    public async Task<Furniture> ReactivateFurnitureAsync(Guid id, CancellationToken ct = default)
    {
        var getFurniture = await repositoryFurniture.GetByIdFurnitureAsync(id, ct);
        if (getFurniture is null)
        {
            var inactiveFurniture = await repositoryFurniture.GetByIdFurnitureIncludingInactiveAsync(id, ct);
            if (inactiveFurniture is null) throw new NotFoundException("El mueble no existe");
            inactiveFurniture.Active = true;
            inactiveFurniture.UpdatedAt = DateTime.UtcNow;
            await repositoryFurniture.UpdateCompleteFurnitureAsync(inactiveFurniture, ct);
            return inactiveFurniture;
        }
        throw new ArgumentException("El mueble ya está activo");
    }
}
