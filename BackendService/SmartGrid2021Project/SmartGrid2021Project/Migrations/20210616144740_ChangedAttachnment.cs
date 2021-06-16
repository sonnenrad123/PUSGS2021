using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedAttachnment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Progress",
                table: "Attachments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Size",
                table: "Attachments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Attachments",
                type: "nvarchar(MAX)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Progress",
                table: "Attachments");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Attachments");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Attachments");
        }
    }
}
