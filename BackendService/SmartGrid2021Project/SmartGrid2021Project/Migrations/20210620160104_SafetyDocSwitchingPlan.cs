using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class SafetyDocSwitchingPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SwitchingPlanId",
                table: "SafetyDocuments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SafetyDocuments_SwitchingPlanId",
                table: "SafetyDocuments",
                column: "SwitchingPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_SafetyDocuments_SwitchingPlans_SwitchingPlanId",
                table: "SafetyDocuments",
                column: "SwitchingPlanId",
                principalTable: "SwitchingPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SafetyDocuments_SwitchingPlans_SwitchingPlanId",
                table: "SafetyDocuments");

            migrationBuilder.DropIndex(
                name: "IX_SafetyDocuments_SwitchingPlanId",
                table: "SafetyDocuments");

            migrationBuilder.DropColumn(
                name: "SwitchingPlanId",
                table: "SafetyDocuments");
        }
    }
}
