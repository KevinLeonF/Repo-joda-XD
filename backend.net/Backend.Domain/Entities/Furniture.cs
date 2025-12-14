namespace Backend.Domain.Entities;

public class Furniture
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Name { get; set; } = default!;
    public decimal Price { get; set; }
    public bool Active { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Guid? CategoryId { get; set; }

    public Categorie? Category { get; set; }
    public Guid UserId { get; set; }
}
