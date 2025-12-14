using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CATEGORIA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_muebles",
                table: "Muebles");

            migrationBuilder.RenameTable(
                name: "Muebles",
                newName: "furniture");

            migrationBuilder.RenameIndex(
                name: "ix_muebles_name",
                table: "furniture",
                newName: "ix_furniture_name");

            migrationBuilder.AddColumn<Guid>(
                name: "category_id",
                table: "furniture",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_furniture",
                table: "furniture",
                column: "id");

            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_categories", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_furniture_category_id",
                table: "furniture",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "ix_categories_name",
                table: "categories",
                column: "name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_furniture_categories_category_id",
                table: "furniture",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_furniture_categories_category_id",
                table: "furniture");

            migrationBuilder.DropTable(
                name: "categories");

            migrationBuilder.DropPrimaryKey(
                name: "pk_furniture",
                table: "furniture");

            migrationBuilder.DropIndex(
                name: "ix_furniture_category_id",
                table: "furniture");

            migrationBuilder.DropColumn(
                name: "category_id",
                table: "furniture");

            migrationBuilder.RenameTable(
                name: "furniture",
                newName: "Muebles");

            migrationBuilder.RenameIndex(
                name: "ix_furniture_name",
                table: "Muebles",
                newName: "ix_muebles_name");

            migrationBuilder.AddPrimaryKey(
                name: "pk_muebles",
                table: "Muebles",
                column: "id");
        }
    }
}
