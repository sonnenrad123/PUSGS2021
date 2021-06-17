using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedWRAddedUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkRequests_AspNetUsers_AppUserId",
                table: "WorkRequests");

            migrationBuilder.DropIndex(
                name: "IX_WorkRequests_AppUserId",
                table: "WorkRequests");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "WorkRequests",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "WorkRequests",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkRequests_AppUserId1",
                table: "WorkRequests",
                column: "AppUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkRequests_AspNetUsers_AppUserId1",
                table: "WorkRequests",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkRequests_AspNetUsers_AppUserId1",
                table: "WorkRequests");

            migrationBuilder.DropIndex(
                name: "IX_WorkRequests_AppUserId1",
                table: "WorkRequests");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "WorkRequests");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "WorkRequests",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkRequests_AppUserId",
                table: "WorkRequests",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkRequests_AspNetUsers_AppUserId",
                table: "WorkRequests",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
