using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumberOfEmployees = table.Column<int>(type: "int", nullable: false),
                    TypeOfCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OriginOfCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DefaultDepartments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartmentName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefaultDepartments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartmentName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FieldOfActions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldOfActions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    created_timestamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    enabled = table.Column<bool>(type: "bit", nullable: false),
                    email_verified = table.Column<bool>(type: "bit", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    access = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Surveys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurveyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surveys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Surveys_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyDepartment",
                columns: table => new
                {
                    CompaniesId = table.Column<int>(type: "int", nullable: false),
                    DepartmentsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyDepartment", x => new { x.CompaniesId, x.DepartmentsId });
                    table.ForeignKey(
                        name: "FK_CompanyDepartment_Companies_CompaniesId",
                        column: x => x.CompaniesId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyDepartment_Departments_DepartmentsId",
                        column: x => x.DepartmentsId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FieldOfActionId = table.Column<int>(type: "int", nullable: false),
                    SurveyQuestion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option5 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_FieldOfActions_FieldOfActionId",
                        column: x => x.FieldOfActionId,
                        principalTable: "FieldOfActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyUserProfile",
                columns: table => new
                {
                    CompaniesId = table.Column<int>(type: "int", nullable: false),
                    Usersid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyUserProfile", x => new { x.CompaniesId, x.Usersid });
                    table.ForeignKey(
                        name: "FK_CompanyUserProfile_Companies_CompaniesId",
                        column: x => x.CompaniesId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyUserProfile_UserProfiles_Usersid",
                        column: x => x.Usersid,
                        principalTable: "UserProfiles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    FieldOfActionId = table.Column<int>(type: "int", nullable: false),
                    SurveyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyDetails_Surveys_SurveyId",
                        column: x => x.SurveyId,
                        principalTable: "Surveys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartmentId = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    SurveyDetailId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyAnswers_SurveyDetails_SurveyDetailId",
                        column: x => x.SurveyDetailId,
                        principalTable: "SurveyDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "DefaultDepartments",
                columns: new[] { "Id", "DepartmentName" },
                values: new object[,]
                {
                    { 1, "Agriculture and crop production" },
                    { 2, "Livestock farming" },
                    { 3, "Horticulture" },
                    { 4, "Vegetable growing" },
                    { 5, "Fruit growing" },
                    { 6, "Wine growing" },
                    { 7, "Forestry" },
                    { 8, "Beekeeping" },
                    { 9, "Inland fishing" },
                    { 10, "Animal breeding" },
                    { 11, "Special crops" }
                });

            migrationBuilder.InsertData(
                table: "FieldOfActions",
                columns: new[] { "Id", "ActionName" },
                values: new object[,]
                {
                    { 1, "Irrigation" },
                    { 2, "Plant protection" },
                    { 3, "Logistics" },
                    { 4, "Economics" },
                    { 5, "Ecology" }
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "FieldOfActionId", "Option1", "Option2", "Option3", "Option4", "Option5", "SurveyQuestion" },
                values: new object[,]
                {
                    { 1, 1, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in smart irrigation?" },
                    { 2, 1, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in drip irrigation?" },
                    { 3, 2, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in forcast on plant protection?" },
                    { 4, 2, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in sensor based use of growth regulators?" },
                    { 5, 3, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in Follow-Me applications with AGV's?" },
                    { 6, 3, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in site planning tools?" },
                    { 7, 4, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in Field Index?" },
                    { 8, 4, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in farm Management system?" },
                    { 9, 5, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in Sustainability assessment?" },
                    { 10, 5, "0", "1", "2", "3", "4", "How do you evaluate your knowledge in digital tools in Sensor assisted based nitrogen fertilization?" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanyDepartment_DepartmentsId",
                table: "CompanyDepartment",
                column: "DepartmentsId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUserProfile_Usersid",
                table: "CompanyUserProfile",
                column: "Usersid");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_FieldOfActionId",
                table: "Questions",
                column: "FieldOfActionId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyAnswers_SurveyDetailId",
                table: "SurveyAnswers",
                column: "SurveyDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyDetails_SurveyId",
                table: "SurveyDetails",
                column: "SurveyId");

            migrationBuilder.CreateIndex(
                name: "IX_Surveys_CompanyId",
                table: "Surveys",
                column: "CompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanyDepartment");

            migrationBuilder.DropTable(
                name: "CompanyUserProfile");

            migrationBuilder.DropTable(
                name: "DefaultDepartments");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "SurveyAnswers");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "FieldOfActions");

            migrationBuilder.DropTable(
                name: "SurveyDetails");

            migrationBuilder.DropTable(
                name: "Surveys");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
