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
                .HasForeignKey(g => g.vehiculo_id);

            modelBuilder.Entity<Vehiculo>()
                .HasMany(v => v.gastos)
                .WithOne(g => g.vehiculo)
                .HasForeignKey(v => v.id);

        }

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Vehiculo> Vehiculo { get; set; }
        public DbSet<GastoVehiculo> GastoVehiculo { get; set; }


    }

}
