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

        public IClientesRepository ClientesRepository => new ClientesRepository(_context);

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
