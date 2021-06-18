using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class SafetyDocumentModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SafetyDocumentId",
                table: "Devices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SafetyDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SafetyDocType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateTimeCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkCompleted = table.Column<bool>(type: "bit", nullable: false),
                    TagsRemoved = table.Column<bool>(type: "bit", nullable: false),
                    GroundingRemoved = table.Column<bool>(type: "bit", nullable: false),
                    ReadyForService = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SafetyDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SafetyDocuments_AspNetUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Devices_SafetyDocumentId",
                table: "Devices",
                column: "SafetyDocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_SafetyDocuments_CreatorId",
                table: "SafetyDocuments",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_SafetyDocuments_SafetyDocumentId",
                table: "Devices",
                column: "SafetyDocumentId",
                principalTable: "SafetyDocuments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_SafetyDocuments_SafetyDocumentId",
                table: "Devices");

            migrationBuilder.DropTable(
                name: "SafetyDocuments");

            migrationBuilder.DropIndex(
                name: "IX_Devices_SafetyDocumentId",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "SafetyDocumentId",
                table: "Devices");
        }
    }
}
