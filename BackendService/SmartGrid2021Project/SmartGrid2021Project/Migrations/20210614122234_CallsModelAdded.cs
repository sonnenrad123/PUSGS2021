using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class CallsModelAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Call_AspNetUsers_CallerId",
                table: "Call");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Call",
                table: "Call");

            migrationBuilder.RenameTable(
                name: "Call",
                newName: "Calls");

            migrationBuilder.RenameIndex(
                name: "IX_Call_CallerId",
                table: "Calls",
                newName: "IX_Calls_CallerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Calls",
                table: "Calls",
                column: "CallId");

            migrationBuilder.AddForeignKey(
                name: "FK_Calls_AspNetUsers_CallerId",
                table: "Calls",
                column: "CallerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Calls_AspNetUsers_CallerId",
                table: "Calls");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Calls",
                table: "Calls");

            migrationBuilder.RenameTable(
                name: "Calls",
                newName: "Call");

            migrationBuilder.RenameIndex(
                name: "IX_Calls_CallerId",
                table: "Call",
                newName: "IX_Call_CallerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Call",
                table: "Call",
                column: "CallId");

            migrationBuilder.AddForeignKey(
                name: "FK_Call_AspNetUsers_CallerId",
                table: "Call",
                column: "CallerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
