using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicarsAPI.Data
{
    public class VehiculoRepository : IVehiculoRepository
    {
        private readonly epicars_Context _context;
        public VehiculoRepository(epicars_Context context)
        {
            _context= context;
        }

        public void DeleteVehiculo(Vehiculo vehiculo)
        {
            _context.Vehiculo.Remove(vehiculo);
        }

        public bool existeBastidor(Vehiculo vehiculo)
        {
           var existeBastidor = _context.Vehiculo.Where(v => v.bastidor.ToUpper() == vehiculo.bastidor.ToUpper()).SingleOrDefault();

            if(vehiculo.id > 0)
            {
                return existeBastidor != null && existeBastidor.bastidor.ToUpper() != vehiculo.bastidor.ToUpper() ? true : false;
            }

           return existeBastidor != null ? true : false;
        }

        public bool existeMatricula(Vehiculo vehiculo)
        {
           var existeMatricula =  _context.Vehiculo.Where(v => v.matricula.ToUpper() == vehiculo.matricula.ToUpper()).SingleOrDefault();

            if(vehiculo.id > 0)
            {
                return existeMatricula != null && existeMatricula.matricula.ToUpper() != vehiculo.matricula.ToUpper() ? true : false;
            }

           return existeMatricula != null ? true : false;
        }


        public async Task<Vehiculo> GetVehiculoById(int id)
        {
            return await _context.Vehiculo.Where(v => v.id == id).SingleOrDefaultAsync();
        }

        public async Task<List<Vehiculo>> GetVehiculosAsync()
        {
            return await _context.Vehiculo
                .Include("gastos")
                .ToListAsync();
        }

        public void InsertVehiculo(Vehiculo vehiculo)
        {
            _context.Vehiculo.Add(vehiculo);
        }

    }
}
