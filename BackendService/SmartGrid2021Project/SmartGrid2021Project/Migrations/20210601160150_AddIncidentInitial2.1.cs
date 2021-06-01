using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class AddIncidentInitial21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Incidents",
                newName: "IncidentType");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Incidents",
                newName: "OutageTime");

            migrationBuilder.AddColumn<bool>(
                name: "DodeliSebi",
                table: "Incidents",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ETR",
                table: "Incidents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DodeliSebi",
                table: "Incidents");

            migrationBuilder.DropColumn(
                name: "ETR",
                table: "Incidents");

            migrationBuilder.RenameColumn(
                name: "OutageTime",
                table: "Incidents",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "IncidentType",
                table: "Incidents",
                newName: "Type");
        }
    }
}
