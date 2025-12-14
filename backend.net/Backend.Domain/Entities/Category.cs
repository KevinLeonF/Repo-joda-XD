
namespace Backend.Domain.Entities;

public class Categorie
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public String Name { get; set; } = null!;

    public String? Description { get; set; }
    public bool Active { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Furniture> Furnitures { get; set; } = new List<Furniture>();
    public Guid UserId { get; }
}
