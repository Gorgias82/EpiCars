using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EpicarsAPI.Data
{
    public class GastoVehiculoRepository : IGastoVehiculoRepository
    {
        private readonly epicars_Context _context;
        public GastoVehiculoRepository(epicars_Context context)
        {
            _context= context;
        }
        public void DeleteGastoVehiculo(GastoVehiculo gastoVehiculo)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<GastoVehiculo>> GetGastosVehiculoAsync()
        {
           

            return await _context.GastoVehiculo
                .ToListAsync();
        }

        public async Task<GastoVehiculo> GetGastoVehiculoById(int id)
        {
           return await _context.GastoVehiculo.Where(v => v.id == id).SingleOrDefaultAsync();
        }

        public void InsertGastoVehiculo(GastoVehiculo gastoVehiculo)
        {
            _context.GastoVehiculo.Add(gastoVehiculo);
        }

        public Task UpdateGastoVehiculo(GastoVehiculo gastoVehiculo)
        {
            throw new System.NotImplementedException();
        }
    }
}
