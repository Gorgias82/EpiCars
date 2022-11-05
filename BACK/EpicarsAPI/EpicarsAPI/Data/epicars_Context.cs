using EpicarsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicarsAPI.Data
{

    public partial class epicars_Context : DbContext
    {
        public  epicars_Context()
        {
        }

        public epicars_Context(DbContextOptions<epicars_Context> options)
             : base(options)
        {          
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GastoVehiculo>()
                .HasOne(g => g.vehiculo)
                .WithMany(v => v.gastos)
                .HasForeignKey(g => g.vehiculo_id).IsRequired(false);

            modelBuilder.Entity<Vehiculo>()
                .HasMany(v => v.gastos)
                .WithOne(g => g.vehiculo)
                .HasForeignKey(v => v.vehiculo_id).IsRequired(false);

            //modelBuilder.Entity<GastoVehiculo>()
            //    .HasOne(g => g.metodoPago)
            //    .WithMany(m => m.gastosVehiculo)
            //    .HasForeignKey(g => g.metodoPago_id);

            //modelBuilder.Entity<MetodoPago>()
            //    .HasMany(m => m.gastosVehiculo)
            //    .WithOne(g => g.metodoPago)
            //    .HasForeignKey(m => m.id);

            modelBuilder.Entity<GastoVehiculo>(entity =>
            {
                entity.HasKey(e => new { e.id, e.vehiculo_id });
            });


        }

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Vehiculo> Vehiculo { get; set; }
        public DbSet<GastoVehiculo> GastoVehiculo { get; set; }
        public DbSet<MetodoPago> MetodoPago { get; set; }


    }

}
