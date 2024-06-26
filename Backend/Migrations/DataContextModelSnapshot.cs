﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Helpers;

namespace WebApi.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("CompanyDepartment", b =>
                {
                    b.Property<int>("CompaniesId")
                        .HasColumnType("int");

                    b.Property<int>("DepartmentsId")
                        .HasColumnType("int");

                    b.HasKey("CompaniesId", "DepartmentsId");

                    b.HasIndex("DepartmentsId");

                    b.ToTable("CompanyDepartment");
                });

            modelBuilder.Entity("CompanyUserProfile", b =>
                {
                    b.Property<int>("CompaniesId")
                        .HasColumnType("int");

                    b.Property<int>("Usersid")
                        .HasColumnType("int");

                    b.HasKey("CompaniesId", "Usersid");

                    b.HasIndex("Usersid");

                    b.ToTable("CompanyUserProfile");
                });

            modelBuilder.Entity("WebApi.Entities.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("CompanyName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Latitude")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Longitude")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfEmployees")
                        .HasColumnType("int");

                    b.Property<string>("OriginOfCompany")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TypeOfCompany")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("WebApi.Entities.DefaultDepartment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("DepartmentName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DefaultDepartments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DepartmentName = "Agriculture and crop production"
                        },
                        new
                        {
                            Id = 2,
                            DepartmentName = "Livestock farming"
                        },
                        new
                        {
                            Id = 3,
                            DepartmentName = "Horticulture"
                        },
                        new
                        {
                            Id = 4,
                            DepartmentName = "Vegetable growing"
                        },
                        new
                        {
                            Id = 5,
                            DepartmentName = "Fruit growing"
                        },
                        new
                        {
                            Id = 6,
                            DepartmentName = "Wine growing"
                        },
                        new
                        {
                            Id = 7,
                            DepartmentName = "Forestry"
                        },
                        new
                        {
                            Id = 8,
                            DepartmentName = "Beekeeping"
                        },
                        new
                        {
                            Id = 9,
                            DepartmentName = "Inland fishing"
                        },
                        new
                        {
                            Id = 10,
                            DepartmentName = "Animal breeding"
                        },
                        new
                        {
                            Id = 11,
                            DepartmentName = "Special crops"
                        });
                });

            modelBuilder.Entity("WebApi.Entities.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("DepartmentName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("WebApi.Entities.FieldOfAction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ActionName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FieldOfActions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ActionName = "Irrigation"
                        },
                        new
                        {
                            Id = 2,
                            ActionName = "Plant protection"
                        },
                        new
                        {
                            Id = 3,
                            ActionName = "Logistics"
                        },
                        new
                        {
                            Id = 4,
                            ActionName = "Economics"
                        },
                        new
                        {
                            Id = 5,
                            ActionName = "Ecology"
                        });
                });

            modelBuilder.Entity("WebApi.Entities.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("FieldOfActionId")
                        .HasColumnType("int");

                    b.Property<string>("Option1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Option2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Option3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Option4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Option5")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SurveyQuestion")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FieldOfActionId");

                    b.ToTable("Questions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FieldOfActionId = 1,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in smart irrigation?"
                        },
                        new
                        {
                            Id = 2,
                            FieldOfActionId = 1,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in drip irrigation?"
                        },
                        new
                        {
                            Id = 3,
                            FieldOfActionId = 2,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in forcast on plant protection?"
                        },
                        new
                        {
                            Id = 4,
                            FieldOfActionId = 2,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in sensor based use of growth regulators?"
                        },
                        new
                        {
                            Id = 5,
                            FieldOfActionId = 3,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in Follow-Me applications with AGV's?"
                        },
                        new
                        {
                            Id = 6,
                            FieldOfActionId = 3,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in site planning tools?"
                        },
                        new
                        {
                            Id = 7,
                            FieldOfActionId = 4,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in Field Index?"
                        },
                        new
                        {
                            Id = 8,
                            FieldOfActionId = 4,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in farm Management system?"
                        },
                        new
                        {
                            Id = 9,
                            FieldOfActionId = 5,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in Sustainability assessment?"
                        },
                        new
                        {
                            Id = 10,
                            FieldOfActionId = 5,
                            Option1 = "0",
                            Option2 = "1",
                            Option3 = "2",
                            Option4 = "3",
                            Option5 = "4",
                            SurveyQuestion = "How do you evaluate your knowledge in digital tools in Sensor assisted based nitrogen fertilization?"
                        });
                });

            modelBuilder.Entity("WebApi.Entities.Survey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("SurveyName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Surveys");
                });

            modelBuilder.Entity("WebApi.Entities.SurveyAnswer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<int>("SurveyDetailId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SurveyDetailId");

                    b.ToTable("SurveyAnswers");
                });

            modelBuilder.Entity("WebApi.Entities.SurveyDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("FieldOfActionId")
                        .HasColumnType("int");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<int>("SurveyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SurveyId");

                    b.ToTable("SurveyDetails");
                });

            modelBuilder.Entity("WebApi.Entities.UserProfile", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("access")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_timestamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("email_verified")
                        .HasColumnType("bit");

                    b.Property<bool>("enabled")
                        .HasColumnType("bit");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("UserProfiles");
                });

            modelBuilder.Entity("CompanyDepartment", b =>
                {
                    b.HasOne("WebApi.Entities.Company", null)
                        .WithMany()
                        .HasForeignKey("CompaniesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Entities.Department", null)
                        .WithMany()
                        .HasForeignKey("DepartmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CompanyUserProfile", b =>
                {
                    b.HasOne("WebApi.Entities.Company", null)
                        .WithMany()
                        .HasForeignKey("CompaniesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Entities.UserProfile", null)
                        .WithMany()
                        .HasForeignKey("Usersid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApi.Entities.Question", b =>
                {
                    b.HasOne("WebApi.Entities.FieldOfAction", "FieldOfAction")
                        .WithMany("Questions")
                        .HasForeignKey("FieldOfActionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FieldOfAction");
                });

            modelBuilder.Entity("WebApi.Entities.Survey", b =>
                {
                    b.HasOne("WebApi.Entities.Company", "Company")
                        .WithMany("Surveys")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("WebApi.Entities.SurveyAnswer", b =>
                {
                    b.HasOne("WebApi.Entities.SurveyDetail", null)
                        .WithMany("SurveyAnswers")
                        .HasForeignKey("SurveyDetailId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApi.Entities.SurveyDetail", b =>
                {
                    b.HasOne("WebApi.Entities.Survey", null)
                        .WithMany("Surveys")
                        .HasForeignKey("SurveyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApi.Entities.Company", b =>
                {
                    b.Navigation("Surveys");
                });

            modelBuilder.Entity("WebApi.Entities.FieldOfAction", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("WebApi.Entities.Survey", b =>
                {
                    b.Navigation("Surveys");
                });

            modelBuilder.Entity("WebApi.Entities.SurveyDetail", b =>
                {
                    b.Navigation("SurveyAnswers");
                });
#pragma warning restore 612, 618
        }
    }
}
