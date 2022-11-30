using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicarsAPI.Data
{
    public class VentaRepository :IVentaRepository
    {
        private readonly epicars_Context _context;
        public VentaRepository(epicars_Context context)
        {
            _context = context;
        }

        public void DeleteVenta(Venta venta)
        {
            _context.Venta.Remove(venta);
        }

        public async Task<Venta> GetVentaById(int id)
        {
            return await _context.Venta.Where(v => v.id == id).SingleOrDefaultAsync();
        }

        public async Task<List<Venta>> GetVentasAsync()
        {
            return await _context.Venta.ToListAsync();
        }

        public void InsertVenta(Venta venta)
        {
            _context.Venta.Add(venta);
        }
    }
}
