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

        }

        public DbSet<Cliente> Cliente { get; set; }

    }

}
