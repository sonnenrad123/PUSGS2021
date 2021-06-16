using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedWRChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WRStateChange_AspNetUsers_ModifiedByUserId1",
                table: "WRStateChange");

            migrationBuilder.DropForeignKey(
                name: "FK_WRStateChange_WorkRequests_WorkRequestId",
                table: "WRStateChange");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WRStateChange",
                table: "WRStateChange");

            migrationBuilder.RenameTable(
                name: "WRStateChange",
                newName: "WRStateChanges");

            migrationBuilder.RenameIndex(
                name: "IX_WRStateChange_WorkRequestId",
                table: "WRStateChanges",
                newName: "IX_WRStateChanges_WorkRequestId");

            migrationBuilder.RenameIndex(
                name: "IX_WRStateChange_ModifiedByUserId1",
                table: "WRStateChanges",
                newName: "IX_WRStateChanges_ModifiedByUserId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WRStateChanges",
                table: "WRStateChanges",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_WRStateChanges_AspNetUsers_ModifiedByUserId1",
                table: "WRStateChanges",
                column: "ModifiedByUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WRStateChanges_WorkRequests_WorkRequestId",
                table: "WRStateChanges",
                column: "WorkRequestId",
                principalTable: "WorkRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WRStateChanges_AspNetUsers_ModifiedByUserId1",
                table: "WRStateChanges");

            migrationBuilder.DropForeignKey(
                name: "FK_WRStateChanges_WorkRequests_WorkRequestId",
                table: "WRStateChanges");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WRStateChanges",
                table: "WRStateChanges");

            migrationBuilder.RenameTable(
                name: "WRStateChanges",
                newName: "WRStateChange");

            migrationBuilder.RenameIndex(
                name: "IX_WRStateChanges_WorkRequestId",
                table: "WRStateChange",
                newName: "IX_WRStateChange_WorkRequestId");

            migrationBuilder.RenameIndex(
                name: "IX_WRStateChanges_ModifiedByUserId1",
                table: "WRStateChange",
                newName: "IX_WRStateChange_ModifiedByUserId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WRStateChange",
                table: "WRStateChange",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_WRStateChange_AspNetUsers_ModifiedByUserId1",
                table: "WRStateChange",
                column: "ModifiedByUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WRStateChange_WorkRequests_WorkRequestId",
                table: "WRStateChange",
                column: "WorkRequestId",
                principalTable: "WorkRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
