using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    
    public DbSet<Furniture> Furnitures => Set<Furniture>();

    
    public DbSet<Categorie> Categories => Set<Categorie>();

    
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<User>(b =>
        {
            b.ToTable("users");
            b.HasKey(u => u.Id);
            b.Property(u => u.Id).HasColumnName("id");
            b.Property(u => u.Name).HasColumnName("name").IsRequired().HasMaxLength(150);
            b.Property(u => u.Email).HasColumnName("email").IsRequired().HasMaxLength(200);
            b.Property(u => u.Password).HasColumnName("password").IsRequired().HasMaxLength(200);
            b.Property(u => u.Active).HasColumnName("active").HasDefaultValue(true);
            b.Property(u => u.UpdateAt).HasColumnName("updated_at").HasDefaultValueSql("now()");
            b.Property(u => u.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("now()");
            b.HasIndex(u => u.Email).IsUnique();
        });

        modelBuilder.Entity<Furniture>(b =>
        {
            b.ToTable("furniture");
            b.HasKey(p => p.Id);
            b.Property(p => p.Id).HasColumnName("id");
            b.Property(p => p.Name).HasColumnName("name").IsRequired().HasMaxLength(200);
            b.Property(p => p.Price).HasColumnName("price").HasPrecision(18, 2);
            b.Property(p => p.Active).HasColumnName("active").HasDefaultValue(true);
            b.Property(p => p.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("now()");
            b.Property(p => p.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("now()");
            b.HasIndex(p => p.Name);

            b.Property(p => p.CategoryId).HasColumnName("category_id");
            b.HasOne(p => p.Category)
            .WithMany(c => c.Furnitures)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<Categorie>(b =>
        {
            b.ToTable("categories");
            b.HasKey(p => p.Id);
            b.Property(p => p.Id).HasColumnName("id");
            b.Property(p => p.Name).HasColumnName("name").IsRequired().HasMaxLength(200);
            b.Property(p => p.Description).HasColumnName("description").HasMaxLength(300);
            b.Property(u => u.UserId).HasColumnName("user_id");
            b.Property(p => p.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("now()");
            b.Property(p => p.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("now()");
            b.HasIndex(p => p.Name);
        });


        ConfigureUser(modelBuilder);
        ConfigureRoles(modelBuilder);
    }

        private static void ConfigureUser(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.Email).IsUnique();
        });
    }

    private static void ConfigureRoles(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("roles");
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.Name).IsUnique();
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.ToTable("permissions");
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.Code).IsUnique();
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("user_roles");
            entity.HasKey(ur => new { ur.UserId, ur.RoleId });

            entity
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            entity
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.ToTable("role_permissions");
            entity.HasKey(rp => new { rp.RoleId, rp.PermissionId });

            entity
                .HasOne(rp => rp.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(rp => rp.RoleId);

            entity
                .HasOne(rp => rp.Permission)
                .WithMany(p => p.RolePermissions)
                .HasForeignKey(rp => rp.PermissionId);
        });
    }
}

