using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedChangeEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CurrentStatus",
                table: "WRStateChanges",
                type: "varchar(30)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CurrentStatus",
                table: "WRStateChanges",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)");
        }
    }
}
