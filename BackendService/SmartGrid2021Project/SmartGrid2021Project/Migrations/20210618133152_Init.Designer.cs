﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SmartGrid2021Project.Models;

namespace SmartGrid2021Project.Migrations
{
    [DbContext(typeof(GeneralDBContext))]
    [Migration("20210618133152_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.7")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AttachmentWorkRequest", b =>
                {
                    b.Property<int>("AttachmentsId")
                        .HasColumnType("int");

                    b.Property<int>("WorkRequestsWR_id")
                        .HasColumnType("int");

                    b.HasKey("AttachmentsId", "WorkRequestsWR_id");

                    b.HasIndex("WorkRequestsWR_id");

                    b.ToTable("AttachmentWorkRequest");
                });

            modelBuilder.Entity("DeviceIncident", b =>
                {
                    b.Property<int>("DevicesId")
                        .HasColumnType("int");

                    b.Property<int>("IncidentsId")
                        .HasColumnType("int");

                    b.HasKey("DevicesId", "IncidentsId");

                    b.HasIndex("IncidentsId");

                    b.ToTable("DeviceIncident");
                });

            modelBuilder.Entity("DeviceWorkRequest", b =>
                {
                    b.Property<int>("EquipmentId")
                        .HasColumnType("int");

                    b.Property<int>("WorkRequestsWR_id")
                        .HasColumnType("int");

                    b.HasKey("EquipmentId", "WorkRequestsWR_id");

                    b.HasIndex("WorkRequestsWR_id");

                    b.ToTable("DeviceWorkRequest");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<bool>("AccountAllowed")
                        .HasColumnType("bit");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("User Address");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("Date")
                        .HasColumnName("Date of birth");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("First Name");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("Last Name");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("RoleOfUser")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("User Role");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserImage")
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("User Image");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<int?>("UserTeamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("UserTeamId");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("DataSrc");

                    b.Property<int>("Progress")
                        .HasColumnType("int")
                        .HasColumnName("Progress");

                    b.Property<int>("Size")
                        .HasColumnType("int")
                        .HasColumnName("Size");

                    b.Property<string>("ToBase64")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("Base64Representation");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Call", b =>
                {
                    b.Property<int>("CallId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CallerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Hazard")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reason")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CallId");

                    b.HasIndex("CallerId");

                    b.ToTable("Calls");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Device", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Coordinates")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Incident", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ATA")
                        .HasColumnType("datetime2");

                    b.Property<int>("AffectedCustomers")
                        .HasColumnType("int");

                    b.Property<int>("Calls")
                        .HasColumnType("int");

                    b.Property<string>("Cause")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Confirmed")
                        .HasColumnType("bit");

                    b.Property<string>("ConstructionType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("DodeliSebi")
                        .HasColumnType("bit");

                    b.Property<DateTime>("ETA")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ETR")
                        .HasColumnType("datetime2");

                    b.Property<int?>("IncidentCrewteamID")
                        .HasColumnType("int");

                    b.Property<string>("IncidentDesc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IncidentType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Material")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OutageTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<DateTime>("ScheduledTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Subcause")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Voltage")
                        .HasColumnType("float");

                    b.Property<string>("phoneNo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IncidentCrewteamID");

                    b.HasIndex("UserId");

                    b.ToTable("Incidents");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Team", b =>
                {
                    b.Property<int>("teamID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Team ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("teamName")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("Team Name");

                    b.HasKey("teamID");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.WRStateChange", b =>
                {
                    b.Property<int>("WRSC_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ChangedByUser")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ChangedByUser");

                    b.Property<DateTime>("ChangedOn")
                        .HasColumnType("Date")
                        .HasColumnName("DateModified");

                    b.Property<int?>("ModifiedByUserId")
                        .HasColumnType("int");

                    b.Property<string>("ModifiedByUserId1")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("WRCurrentState")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasColumnName("CurrentStatus");

                    b.Property<int?>("WorkRequestId")
                        .HasColumnType("int");

                    b.HasKey("WRSC_Id");

                    b.HasIndex("ModifiedByUserId1");

                    b.HasIndex("WorkRequestId");

                    b.ToTable("WRStateChanges");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.WorkRequest", b =>
                {
                    b.Property<int>("WR_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AppUserId")
                        .HasColumnType("int");

                    b.Property<string>("AppUserId1")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Company")
                        .IsRequired()
                        .HasColumnType("varchar(60)")
                        .HasColumnName("Company");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("varchar(60)")
                        .HasColumnName("CreatedBy");

                    b.Property<DateTime>("DateTimeCreated")
                        .HasColumnType("Date")
                        .HasColumnName("CreatedOnDate");

                    b.Property<string>("Details")
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("Details");

                    b.Property<bool>("EmergencyWork")
                        .HasColumnType("Bit")
                        .HasColumnName("IsEmergencyWork");

                    b.Property<DateTime>("EndDateTime")
                        .HasColumnType("Date")
                        .HasColumnName("EndDate");

                    b.Property<int?>("IncidentId")
                        .HasColumnType("int")
                        .HasColumnName("IncidentId");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("Notes");

                    b.Property<int>("PhoneNo")
                        .HasColumnType("Int")
                        .HasColumnName("PhoneNo");

                    b.Property<string>("Purpose")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("Purpose");

                    b.Property<DateTime>("StartDateTime")
                        .HasColumnType("Date")
                        .HasColumnName("StartDate");

                    b.Property<string>("StatusOfDocument")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasColumnName("DocumentStatus");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("Address");

                    b.Property<string>("TypeOfDocument")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasColumnName("TypeOfDocument");

                    b.HasKey("WR_id");

                    b.HasIndex("AppUserId1");

                    b.HasIndex("IncidentId");

                    b.ToTable("WorkRequests");
                });

            modelBuilder.Entity("AttachmentWorkRequest", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.Attachment", null)
                        .WithMany()
                        .HasForeignKey("AttachmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartGrid2021Project.Models.WorkRequest", null)
                        .WithMany()
                        .HasForeignKey("WorkRequestsWR_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DeviceIncident", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.Device", null)
                        .WithMany()
                        .HasForeignKey("DevicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartGrid2021Project.Models.Incident", null)
                        .WithMany()
                        .HasForeignKey("IncidentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DeviceWorkRequest", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.Device", null)
                        .WithMany()
                        .HasForeignKey("EquipmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartGrid2021Project.Models.WorkRequest", null)
                        .WithMany()
                        .HasForeignKey("WorkRequestsWR_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartGrid2021Project.Models.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.AppUser", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.Team", "UserTeam")
                        .WithMany("teamMembers")
                        .HasForeignKey("UserTeamId");

                    b.Navigation("UserTeam");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Call", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.AppUser", "Caller")
                        .WithMany("Calls")
                        .HasForeignKey("CallerId");

                    b.Navigation("Caller");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Incident", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.Team", "IncidentCrew")
                        .WithMany()
                        .HasForeignKey("IncidentCrewteamID");

                    b.HasOne("SmartGrid2021Project.Models.AppUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("IncidentCrew");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.WRStateChange", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.AppUser", "ModifiedByUser")
                        .WithMany()
                        .HasForeignKey("ModifiedByUserId1");

                    b.HasOne("SmartGrid2021Project.Models.WorkRequest", "WorkRequest")
                        .WithMany("StateChangesHistory")
                        .HasForeignKey("WorkRequestId");

                    b.Navigation("ModifiedByUser");

                    b.Navigation("WorkRequest");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.WorkRequest", b =>
                {
                    b.HasOne("SmartGrid2021Project.Models.AppUser", "AppUser")
                        .WithMany("UserWorkRequests")
                        .HasForeignKey("AppUserId1");

                    b.HasOne("SmartGrid2021Project.Models.Incident", "Incident")
                        .WithMany("WorkRequests")
                        .HasForeignKey("IncidentId");

                    b.Navigation("AppUser");

                    b.Navigation("Incident");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.AppUser", b =>
                {
                    b.Navigation("Calls");

                    b.Navigation("UserWorkRequests");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Incident", b =>
                {
                    b.Navigation("WorkRequests");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.Team", b =>
                {
                    b.Navigation("teamMembers");
                });

            modelBuilder.Entity("SmartGrid2021Project.Models.WorkRequest", b =>
                {
                    b.Navigation("StateChangesHistory");
                });
#pragma warning restore 612, 618
        }
    }
}
