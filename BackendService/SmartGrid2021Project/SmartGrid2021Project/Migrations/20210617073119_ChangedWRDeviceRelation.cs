using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedWRDeviceRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_WorkRequests_WorkRequestId",
                table: "Devices");

            migrationBuilder.DropIndex(
                name: "IX_Devices_WorkRequestId",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "WorkRequestId",
                table: "Devices");

            migrationBuilder.CreateTable(
                name: "DeviceWorkRequest",
                columns: table => new
                {
                    EquipmentId = table.Column<int>(type: "int", nullable: false),
                    WorkRequestsWR_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceWorkRequest", x => new { x.EquipmentId, x.WorkRequestsWR_id });
                    table.ForeignKey(
                        name: "FK_DeviceWorkRequest_Devices_EquipmentId",
                        column: x => x.EquipmentId,
                        principalTable: "Devices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeviceWorkRequest_WorkRequests_WorkRequestsWR_id",
                        column: x => x.WorkRequestsWR_id,
                        principalTable: "WorkRequests",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceWorkRequest_WorkRequestsWR_id",
                table: "DeviceWorkRequest",
                column: "WorkRequestsWR_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeviceWorkRequest");

            migrationBuilder.AddColumn<int>(
                name: "WorkRequestId",
                table: "Devices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Devices_WorkRequestId",
                table: "Devices",
                column: "WorkRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_WorkRequests_WorkRequestId",
                table: "Devices",
                column: "WorkRequestId",
                principalTable: "WorkRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
