using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedWREnums : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TypeOfDocument",
                table: "WorkRequests",
                type: "varchar(30)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "Int");

            migrationBuilder.AlterColumn<string>(
                name: "DocumentStatus",
                table: "WorkRequests",
                type: "varchar(30)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TypeOfDocument",
                table: "WorkRequests",
                type: "Int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)");

            migrationBuilder.AlterColumn<int>(
                name: "DocumentStatus",
                table: "WorkRequests",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)");
        }
    }
}
