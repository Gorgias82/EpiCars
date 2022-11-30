using System.Threading.Tasks;

namespace EpicarsAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IClienteRepository ClientesRepository { get; }
        IVehiculoRepository VehiculoRepository { get; }
        IVentaRepository VentaRepository { get; }
        IGastoVehiculoRepository GastoVehiculoRepository { get; }
        IMetodoPagoRepository MetodoPagoRepository { get; }
        Task<int> Complete();
        bool HasChanges();
    }
}
