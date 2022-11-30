using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicarsAPI.Interfaces
{
    public interface IVehiculoRepository
    {
        Task<List<Vehiculo>> GetVehiculosAsync();
        Task<Vehiculo> GetVehiculoById(int id);

        void InsertVehiculo(Vehiculo vehiculo);
        void DeleteVehiculo(Vehiculo vehiculo);
        bool existeMatricula(Vehiculo vehiculo);
        bool existeBastidor(Vehiculo vehiculo);   
    }
}
