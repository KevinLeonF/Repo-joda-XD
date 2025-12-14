namespace Backend.Infrastructure.Persistence;

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;


public class CategorieRepositoryEf : ICategorieRepository
{
    private readonly AppDbContext database;

    public CategorieRepositoryEf(AppDbContext db) => database = db;

    public Task<int> SaveCategorie(CancellationToken ct = default)
    {
        return database.SaveChangesAsync(ct);
    }

    public async Task<Categorie> CreateCategorieAsync(Categorie categorie, CancellationToken ct = default)
    {
        await database.AddAsync(categorie, ct);
        return categorie;
    }

    public Task<bool> CheckExistCategorieById(Guid categorieId, CancellationToken ct = default)
    {
        return database.Categories.AnyAsync(c => c.Id == categorieId, ct);
    }

    public async Task<IReadOnlyList<Categorie>> ListAllCategoriesAsync(CancellationToken ct = default)
    {
        return await database.Categories
            .AsNoTracking()
            .ToListAsync(ct);
    }

    public Task<Categorie?> GetCategorieByIdAsync(Guid id, CancellationToken ct = default)
    {
        return database.Categories
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && c.Active, ct);
    }

    public async Task<Categorie> UpdateCategorieAsync(Categorie categorie, CancellationToken ct = default)
    {
        database.Categories.Update(categorie);
        await database.SaveChangesAsync(ct);
        return categorie;
    }

    public async Task<Categorie?> GetByIdCategorieIncludingInactiveAsync(Guid id, CancellationToken ct = default)
    {
        return await database.Categories
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, ct);
    }
}

