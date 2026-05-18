using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSeka.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddMessageToApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Message",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Message",
                table: "Applications");
        }
    }
}
