using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class SafetyDocSwitchingPlanIDChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SafetyDocuments_SwitchingPlans_SwitchingPlanId",
                table: "SafetyDocuments");

            migrationBuilder.RenameColumn(
                name: "SwitchingPlanId",
                table: "SafetyDocuments",
                newName: "SwitchingPlanId1");

            migrationBuilder.RenameIndex(
                name: "IX_SafetyDocuments_SwitchingPlanId",
                table: "SafetyDocuments",
                newName: "IX_SafetyDocuments_SwitchingPlanId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SafetyDocuments_SwitchingPlans_SwitchingPlanId1",
                table: "SafetyDocuments",
                column: "SwitchingPlanId1",
                principalTable: "SwitchingPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SafetyDocuments_SwitchingPlans_SwitchingPlanId1",
                table: "SafetyDocuments");

            migrationBuilder.RenameColumn(
                name: "SwitchingPlanId1",
                table: "SafetyDocuments",
                newName: "SwitchingPlanId");

            migrationBuilder.RenameIndex(
                name: "IX_SafetyDocuments_SwitchingPlanId1",
                table: "SafetyDocuments",
                newName: "IX_SafetyDocuments_SwitchingPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_SafetyDocuments_SwitchingPlans_SwitchingPlanId",
                table: "SafetyDocuments",
                column: "SwitchingPlanId",
                principalTable: "SwitchingPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
