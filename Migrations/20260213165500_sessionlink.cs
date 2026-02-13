using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rolayther.Migrations
{
    /// <inheritdoc />
    public partial class sessionlink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SessionLink",
                table: "Sessions",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SessionLink",
                table: "Sessions");
        }
    }
}
