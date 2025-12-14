namespace Backend.Infrastructure.Persistence;

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

public class FurnitureRepositoryEf : IFurnitureRepository
{
    private readonly AppDbContext database;

    public FurnitureRepositoryEf(AppDbContext db) => database = db;

    public Task<int> SaveChangesFurnitureAsync(CancellationToken ct)
    {
        return database.SaveChangesAsync(ct);
    }
    public async Task<Furniture> CreateFurnitureAsync(Furniture furniture, CancellationToken ct = default)
    {
        await database.AddAsync(furniture, ct);
        return furniture;
    }

    public async Task<IReadOnlyList<Furniture>> GetAllFurnituresAsync(CancellationToken ct = default)
    {
        return await database.Furnitures.AsNoTracking().ToListAsync(ct);
    }

    public async Task<Furniture?> GetByIdFurnitureAsync(Guid id, CancellationToken ct = default)
    {
        return await database.Furnitures.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id && p.Active, ct);
    }

    public async Task<Furniture?> UpdateCompleteFurnitureAsync(Furniture furniture, CancellationToken ct = default)
    {
        database.Furnitures.Update(furniture);
        await database.SaveChangesAsync(ct);
        return await this.GetByIdFurnitureAsync(furniture.Id, ct);
    }

    public async Task<Furniture?> ActuaizarPrecioFurnitureAsync(Furniture furniture, CancellationToken ct = default)
    {
        database.Furnitures.Update(furniture);
        await database.SaveChangesAsync(ct);
        return await this.GetByIdFurnitureAsync(furniture.Id, ct);
    }

    public async Task<Furniture?> DeleteFurnitureAsync(Furniture furniture, CancellationToken ct = default)
    {
        database.Furnitures.Update(furniture);
        await database.SaveChangesAsync(ct);
        return furniture;
    }

    public async Task<Furniture?> GetByIdFurnitureIncludingInactiveAsync(Guid id, CancellationToken ct = default)
    {
        return await database.Furnitures.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id, ct);
    }
}
