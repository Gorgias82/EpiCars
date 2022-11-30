using EpicarsAPI.Interfaces;
using System.Threading.Tasks;

namespace EpicarsAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly epicars_Context _context;
        
        public UnitOfWork(epicars_Context context)
        {
            _context= context;
        }

        public IClienteRepository ClientesRepository => new ClienteRepository(_context);

        public IVehiculoRepository VehiculoRepository => new VehiculoRepository(_context);

        public IVentaRepository VentaRepository => new VentaRepository(_context);

        public IGastoVehiculoRepository GastoVehiculoRepository => new GastoVehiculoRepository(_context);

        public IMetodoPagoRepository MetodoPagoRepository => new MetodoPagoRepository(_context);

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
