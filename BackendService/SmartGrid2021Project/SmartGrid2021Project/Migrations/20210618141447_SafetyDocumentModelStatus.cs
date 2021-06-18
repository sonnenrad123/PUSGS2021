﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartGrid2021Project.Migrations
{
    public partial class SafetyDocumentModelStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "SafetyDocuments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "SafetyDocuments");
        }
    }
}
