using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class IncidentModelAddedTeam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IncidentCrewteamID",
                table: "Incidents",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Incidents_IncidentCrewteamID",
                table: "Incidents",
                column: "IncidentCrewteamID");

            migrationBuilder.AddForeignKey(
                name: "FK_Incidents_Teams_IncidentCrewteamID",
                table: "Incidents",
                column: "IncidentCrewteamID",
                principalTable: "Teams",
                principalColumn: "Team ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incidents_Teams_IncidentCrewteamID",
                table: "Incidents");

            migrationBuilder.DropIndex(
                name: "IX_Incidents_IncidentCrewteamID",
                table: "Incidents");

            migrationBuilder.DropColumn(
                name: "IncidentCrewteamID",
                table: "Incidents");
        }
    }
}
