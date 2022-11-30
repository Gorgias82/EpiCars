using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicarsAPI.Interfaces
{
    public interface IVentaRepository
    {
        Task<List<Venta>> GetVentasAsync();
        Task<Venta> GetVentaById(int id);
        void InsertVenta(Venta venta);
        void DeleteVenta(Venta venta);
    }
}
