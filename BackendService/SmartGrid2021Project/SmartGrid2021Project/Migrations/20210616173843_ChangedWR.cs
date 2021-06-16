using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedWR : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkRequests_AspNetUsers_AppUserId1",
                table: "WorkRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_WRStateChange_AspNetUsers_ChangedByUserId",
                table: "WRStateChange");

            migrationBuilder.DropIndex(
                name: "IX_WorkRequests_AppUserId1",
                table: "WorkRequests");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "WorkRequests");

            migrationBuilder.RenameColumn(
                name: "ChangedByUserId",
                table: "WRStateChange",
                newName: "ModifiedByUserId1");

            migrationBuilder.RenameIndex(
                name: "IX_WRStateChange_ChangedByUserId",
                table: "WRStateChange",
                newName: "IX_WRStateChange_ModifiedByUserId1");

            migrationBuilder.AddColumn<string>(
                name: "ChangedByUser",
                table: "WRStateChange",
                type: "nvarchar(max)",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_WRStateChange_AspNetUsers_ModifiedByUserId1",
                table: "WRStateChange",
                column: "ModifiedByUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkRequests_AspNetUsers_AppUserId",
                table: "WorkRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_WRStateChange_AspNetUsers_ModifiedByUserId1",
                table: "WRStateChange");

            migrationBuilder.DropIndex(
                name: "IX_WorkRequests_AppUserId",
                table: "WorkRequests");

            migrationBuilder.DropColumn(
                name: "ChangedByUser",
                table: "WRStateChange");

            migrationBuilder.RenameColumn(
                name: "ModifiedByUserId1",
                table: "WRStateChange",
                newName: "ChangedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_WRStateChange_ModifiedByUserId1",
                table: "WRStateChange",
                newName: "IX_WRStateChange_ChangedByUserId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_WRStateChange_AspNetUsers_ChangedByUserId",
                table: "WRStateChange",
                column: "ChangedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
