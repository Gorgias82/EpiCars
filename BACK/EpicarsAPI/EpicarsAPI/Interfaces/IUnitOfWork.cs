using System.Threading.Tasks;

namespace EpicarsAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IClientesRepository ClientesRepository { get; }

        Task<int> Complete();
        bool HasChanges();
    }
}
