namespace Backend.Domain.Services;

using Backend.Domain.Repositories;
using Backend.Domain.Common;
using Backend.Domain.Entities;
using Backend.Domain.Services.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading;

public class CategorieService(ICategorieRepository categorieRepository) : ICategorieService
{
    public async Task<Categorie> CreateCategorieServiceAsync(string name, string? description, CancellationToken ct = default)
    {
        var newCategorie = new Categorie { Name = name, Description = description };
        await categorieRepository.CreateCategorieAsync(newCategorie, ct);
        await categorieRepository.SaveCategorie(ct);
        return newCategorie;
    }

    public async Task<IReadOnlyList<Categorie>> ListAllCategoriesAsync(CancellationToken ct = default)
    {
        return await categorieRepository.ListAllCategoriesAsync(ct);
    }

    public async Task<Categorie?> GetCategorieByIdAsync(Guid id, CancellationToken ct = default)
    {
        var categorie = await categorieRepository.GetCategorieByIdAsync(id, ct);
        if (categorie is null)
            throw new NotFoundException($"Categoría con ID {id} no encontrada");
        return categorie;
    }

    public async Task<Categorie> UpdateCompleteCategorieAsync(Guid id, string name, string? description, CancellationToken ct = default)
    {
        var categorie = await categorieRepository.GetCategorieByIdAsync(id, ct);
        if (categorie is null)
            throw new NotFoundException($"Categoría con ID {id} no encontrada");

        categorie = new Categorie { Id = categorie.Id, Name = name, Description = description, Active = categorie.Active, CreatedAt = categorie.CreatedAt, UpdatedAt = DateTime.UtcNow };
        await categorieRepository.UpdateCategorieAsync(categorie, ct);
        await categorieRepository.SaveCategorie(ct);
        return categorie;
    }

    public async Task<Categorie> DeleteCategorieLogicAsync(Guid id, CancellationToken ct = default)
    {
        var categorie = await categorieRepository.GetCategorieByIdAsync(id, ct);
        if (categorie is null)
            throw new NotFoundException($"Categoría con ID {id} no encontrada");

        categorie = new Categorie { Id = categorie.Id, Name = categorie.Name, Description = categorie.Description, Active = false, CreatedAt = categorie.CreatedAt, UpdatedAt = DateTime.UtcNow };
        await categorieRepository.UpdateCategorieAsync(categorie, ct);
        await categorieRepository.SaveCategorie(ct);
        return categorie;
    }

    public async Task<Categorie> ReactivateCategorieAsync(Guid id, CancellationToken ct = default)
    {
        var categorie = await categorieRepository.GetCategorieByIdAsync(id, ct);
        if (categorie is null)
        {
            // Buscar también en inactivos
            var inactiveCategorie = await categorieRepository.GetByIdCategorieIncludingInactiveAsync(id, ct);
            if (inactiveCategorie is null) throw new NotFoundException($"Categoría con ID {id} no encontrada");
            inactiveCategorie.Active = true;
            inactiveCategorie.UpdatedAt = DateTime.UtcNow;
            await categorieRepository.UpdateCategorieAsync(inactiveCategorie, ct);
            await categorieRepository.SaveCategorie(ct);
            return inactiveCategorie;
        }
        throw new ArgumentException("La categoría ya está activa");
    }
}
