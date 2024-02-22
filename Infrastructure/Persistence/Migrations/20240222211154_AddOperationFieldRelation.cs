using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOperationFieldRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "FieldId",
                table: "Operations",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Operations_FieldId",
                table: "Operations",
                column: "FieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_Fields_FieldId",
                table: "Operations",
                column: "FieldId",
                principalTable: "Fields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operations_Fields_FieldId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_FieldId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FieldId",
                table: "Operations");
        }
    }
}
