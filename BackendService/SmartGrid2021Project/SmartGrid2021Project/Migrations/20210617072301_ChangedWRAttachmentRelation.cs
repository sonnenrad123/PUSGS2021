using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class ChangedWRAttachmentRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_WorkRequests_WorkRequestId",
                table: "Attachments");

            migrationBuilder.DropIndex(
                name: "IX_Attachments_WorkRequestId",
                table: "Attachments");

            migrationBuilder.DropColumn(
                name: "WorkRequestId",
                table: "Attachments");

            migrationBuilder.CreateTable(
                name: "AttachmentWorkRequest",
                columns: table => new
                {
                    AttachmentsId = table.Column<int>(type: "int", nullable: false),
                    WorkRequestsWR_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttachmentWorkRequest", x => new { x.AttachmentsId, x.WorkRequestsWR_id });
                    table.ForeignKey(
                        name: "FK_AttachmentWorkRequest_Attachments_AttachmentsId",
                        column: x => x.AttachmentsId,
                        principalTable: "Attachments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttachmentWorkRequest_WorkRequests_WorkRequestsWR_id",
                        column: x => x.WorkRequestsWR_id,
                        principalTable: "WorkRequests",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttachmentWorkRequest_WorkRequestsWR_id",
                table: "AttachmentWorkRequest",
                column: "WorkRequestsWR_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttachmentWorkRequest");

            migrationBuilder.AddColumn<int>(
                name: "WorkRequestId",
                table: "Attachments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_WorkRequestId",
                table: "Attachments",
                column: "WorkRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_WorkRequests_WorkRequestId",
                table: "Attachments",
                column: "WorkRequestId",
                principalTable: "WorkRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
