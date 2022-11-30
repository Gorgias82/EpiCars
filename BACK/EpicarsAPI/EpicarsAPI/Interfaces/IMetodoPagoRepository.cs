using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicarsAPI.Interfaces
{
    public interface IMetodoPagoRepository
    {
        Task<List<MetodoPago>> GetMetodoPagosAsync();
    }
}
