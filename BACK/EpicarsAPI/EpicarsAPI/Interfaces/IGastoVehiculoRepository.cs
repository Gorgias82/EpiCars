using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicarsAPI.Interfaces
{
    public interface IGastoVehiculoRepository
    {
        Task<List<GastoVehiculo>> GetGastosVehiculoAsync();
        Task<GastoVehiculo> GetGastoVehiculoById(int id);
        void InsertGastoVehiculo(GastoVehiculo gastoVehiculo);
        Task UpdateGastoVehiculo(GastoVehiculo gastoVehiculo);
        void DeleteGastoVehiculo(GastoVehiculo gastoVehiculo);
    }
}
