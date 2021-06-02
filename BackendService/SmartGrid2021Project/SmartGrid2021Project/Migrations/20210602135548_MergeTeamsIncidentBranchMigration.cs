using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class MergeTeamsIncidentBranchMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserTeam",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "UserImage",
                table: "AspNetUsers",
                newName: "User Image");

            migrationBuilder.RenameColumn(
                name: "RoleOfUser",
                table: "AspNetUsers",
                newName: "User Role");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "AspNetUsers",
                newName: "Last Name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "AspNetUsers",
                newName: "First Name");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "AspNetUsers",
                newName: "Date of birth");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "AspNetUsers",
                newName: "User Address");

            migrationBuilder.AlterColumn<string>(
                name: "User Image",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "User Address",
                table: "AspNetUsers",
                type: "varchar(90)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(90)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserTeamId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    TeamID = table.Column<int>(name: "Team ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeamName = table.Column<string>(name: "Team Name", type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.TeamID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserTeamId",
                table: "AspNetUsers",
                column: "UserTeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Teams_UserTeamId",
                table: "AspNetUsers",
                column: "UserTeamId",
                principalTable: "Teams",
                principalColumn: "Team ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Teams_UserTeamId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserTeamId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserTeamId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "User Role",
                table: "AspNetUsers",
                newName: "RoleOfUser");

            migrationBuilder.RenameColumn(
                name: "User Image",
                table: "AspNetUsers",
                newName: "UserImage");

            migrationBuilder.RenameColumn(
                name: "User Address",
                table: "AspNetUsers",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "Last Name",
                table: "AspNetUsers",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "First Name",
                table: "AspNetUsers",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Date of birth",
                table: "AspNetUsers",
                newName: "DateOfBirth");

            migrationBuilder.AlterColumn<string>(
                name: "UserImage",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "AspNetUsers",
                type: "varchar(90)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(90)");

            migrationBuilder.AddColumn<string>(
                name: "UserTeam",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: true);
        }
    }
}
