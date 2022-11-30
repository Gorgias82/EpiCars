using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace EpicarsAPI.Data
{
    public class MetodoPagoRepository : IMetodoPagoRepository
    {
        private readonly epicars_Context _context;
        public MetodoPagoRepository(epicars_Context context)
        {
            _context= context;
        }
        public async Task<List<MetodoPago>> GetMetodoPagosAsync()
        {
            return await _context.MetodoPago.ToListAsync();
        }
    }
}
