using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class SafetyDocumentNewRelationshipv2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Devices_DeviceId",
                table: "Devices");

            migrationBuilder.DropForeignKey(
                name: "FK_Devices_SafetyDocuments_SafetyDocumentId",
                table: "Devices");

            migrationBuilder.DropIndex(
                name: "IX_Devices_DeviceId",
                table: "Devices");

            migrationBuilder.DropIndex(
                name: "IX_Devices_SafetyDocumentId",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "SafetyDocumentId",
                table: "Devices");

            migrationBuilder.CreateTable(
                name: "DeviceSafetyDocument",
                columns: table => new
                {
                    DevicesId = table.Column<int>(type: "int", nullable: false),
                    SafetyDocumentsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceSafetyDocument", x => new { x.DevicesId, x.SafetyDocumentsId });
                    table.ForeignKey(
                        name: "FK_DeviceSafetyDocument_Devices_DevicesId",
                        column: x => x.DevicesId,
                        principalTable: "Devices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeviceSafetyDocument_SafetyDocuments_SafetyDocumentsId",
                        column: x => x.SafetyDocumentsId,
                        principalTable: "SafetyDocuments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceSafetyDocument_SafetyDocumentsId",
                table: "DeviceSafetyDocument",
                column: "SafetyDocumentsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeviceSafetyDocument");

            migrationBuilder.AddColumn<int>(
                name: "DeviceId",
                table: "Devices",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SafetyDocumentId",
                table: "Devices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Devices_DeviceId",
                table: "Devices",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_Devices_SafetyDocumentId",
                table: "Devices",
                column: "SafetyDocumentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Devices_DeviceId",
                table: "Devices",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_SafetyDocuments_SafetyDocumentId",
                table: "Devices",
                column: "SafetyDocumentId",
                principalTable: "SafetyDocuments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
