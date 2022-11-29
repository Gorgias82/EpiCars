using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicarsAPI.Interfaces
{
    public interface IClientesRepository
    {
        Task<List<Cliente>> GetClientesAsync(int pageIndex, int pageSize);

        Task <Cliente> GetById(int id);

        void InsertCliente(Cliente cliente);

        Task UpdateCliente(Cliente cliente);

        void DeleteCliente(Cliente cliente);

        bool ExisteDocumento(Cliente cliente);
        bool ExisteTelefono(Cliente cliente);
        Cliente ExisteEmail(Cliente cliente);


    }
}
