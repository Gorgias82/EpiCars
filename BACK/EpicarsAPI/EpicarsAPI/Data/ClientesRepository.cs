using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EpicarsAPI.Data
{
    public class ClientesRepository : IClientesRepository
    {
        private readonly epicars_Context _context;
        public ClientesRepository(epicars_Context context)
        {
            _context = context;
        }

        public async Task<List<Cliente>> GetClientesAsync(int pageIndex, int pageSize)
        {
      
            if (pageIndex >= 0 && pageSize > 0)
            {
                int comienzo = pageIndex * pageSize;
                return await _context.Cliente
                    .OrderBy(c => c.apellido1)
                    .Skip(comienzo)
                    .Take(pageSize)
                    .ToListAsync();
            }
            else
            {
                return await _context.Cliente
                  .OrderBy(c => c.apellido1)
                  .ToListAsync();

            }
        
        }
        public async Task<Cliente> GetById(int id)
        {
           

            var cliente = await _context.Cliente
                            .Where(c => c.id == id)
                            .SingleOrDefaultAsync();

            return cliente;
        }
        public void InsertCliente(Cliente cliente)
        {
             _context.Cliente.Add(cliente);
        }

        public Task UpdateCliente(Cliente cliente)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteCliente(Cliente cliente)
        {
            _context.Cliente.Remove(cliente);
        }

        public bool ExisteDocumento(Cliente cliente)
        {
            var existeDocumento = _context.Cliente.Where(c => c.documento.ToUpper() == cliente.documento.ToUpper()).SingleOrDefault();

            if(cliente.id > 0)
            {
                return existeDocumento != null && existeDocumento.id != cliente.id ? true : false;
            } 

            return existeDocumento != null ? true : false;
        }

        public bool ExisteTelefono(Cliente cliente)
        {
            var existeTelefono = _context.Cliente.Where(c => c.telefono.ToUpper() == cliente.telefono.ToUpper()).SingleOrDefault();

            return existeTelefono != null ? true : false;
        }

        public Cliente ExisteEmail(Cliente cliente)
        {
            return _context.Cliente.Where(c => c.email.ToUpper() == cliente.email.ToUpper()).SingleOrDefault();

            
        }
    }
}
