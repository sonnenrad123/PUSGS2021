using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class SafetyDocumentNewRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeviceId",
                table: "Devices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Devices_DeviceId",
                table: "Devices",
                column: "DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Devices_DeviceId",
                table: "Devices",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Devices_DeviceId",
                table: "Devices");

            migrationBuilder.DropIndex(
                name: "IX_Devices_DeviceId",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "Devices");
        }
    }
}
