using EpicarsAPI.Data;
using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicarsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {

        private readonly IUnitOfWork _uow;

        public ClienteController(IUnitOfWork uow)
        {
            _uow = uow;

        }
        
        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> GetClientesList([FromQuery] int pageIndex, int pageSize)
        {
            

            return Ok( await _uow.ClientesRepository.GetClientesAsync(pageIndex, pageSize));


        }

        [Route("FindById")]
        [HttpGet]
        public async Task<ActionResult<Cliente>> FindById([FromQuery] int id)
        {
            if (id <= 0) return BadRequest(new { mensaje = "Debe seleccionar un cliente" });

            var cliente = await _uow.ClientesRepository.GetById(id);

            if (cliente == null) return BadRequest(new { mensaje = "No existe el cliente seleccionado" });


            return Ok(cliente);

        }

        [HttpPost]
        public async Task<ActionResult> InsertCliente([FromBody] Cliente cliente)
        {
            if( cliente == null)
            {
                return BadRequest(new { mensaje = "Debe introducir un cliente" });
            }
            if ( cliente.telefono == null || cliente.telefono.Length <= 0){
                return BadRequest(new { mensaje = "Debe introducir un número de teléfono" });
            }
            if (cliente.apellido1 == null || cliente.apellido1.Length <= 0)
            {
                return BadRequest(new { mensaje = "Debe introducir el primer apellido del cliente" });
            }
            if (cliente.nombre == null || cliente.nombre.Length <= 0)
            {
                return BadRequest(new { mensaje = "Debe introducir el nombre del cliente" });
            }
            if (cliente.documento == null || cliente.documento.Length <= 0)
            {
                return BadRequest(new { mensaje = "Debe introducir el documento(DNI o NIE) del cliente" });
            }

            var existeDocumento = _uow.ClientesRepository.ExisteDocumento(cliente);

            if( existeDocumento)
            {
                return BadRequest(new { mensaje = "Ya existe un cliente con ese dni o nie" });
            }

            var existeTelefono = _uow.ClientesRepository.ExisteTelefono(cliente);

            if (existeTelefono)
            {
                return BadRequest(new { mensaje = "Ya existe un cliente con ese telefono" });
            }

            var existeEmail = _uow.ClientesRepository.ExisteEmail(cliente);
    
            if (existeEmail != null && existeEmail.email.Length > 0)
            {
                return BadRequest(new { mensaje = "Ya existe un cliente con ese email" });
            }
            if(cliente.email.Length <= 0)
            {
                cliente.email = null;
            }


            _uow.ClientesRepository.InsertCliente(cliente);
            var result = await _uow.Complete();

            if( result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido introducir el cliente correctamente" });
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCliente(Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest(new { mensaje = "Debe introducir un cliente" });
            }

            Cliente oldCliente = await _uow.ClientesRepository.GetById(cliente.id);

            if (oldCliente == null)
            {
                return BadRequest(new { mensaje = "El cliente que esta tratando de modificar no existe" });
            }
            if (cliente.telefono != null && cliente.telefono.Length >= 0)
            {
                oldCliente.telefono = cliente.telefono;
            }
            if (cliente.apellido1 != null && cliente.apellido1.Length >= 0)
            {
                oldCliente.apellido1 = cliente.apellido1;
            }
            if (cliente.nombre != null && cliente.nombre.Length >= 0)
            {
                oldCliente.nombre = cliente.nombre;
            }
            if (cliente.documento != null && cliente.documento.Length >= 0)
            {
                var existeDocumento = _uow.ClientesRepository.ExisteDocumento(cliente);

                if (existeDocumento)
                {
                    return BadRequest(new { mensaje = "Ya existe un cliente con ese dni o nie" });
                }
                oldCliente.documento = cliente.documento;
            }
            if (cliente.apellido2 != null)
            {
                oldCliente.apellido2 = cliente.apellido2;
            }
            if(cliente.direccion != null)
            {
                oldCliente.direccion = cliente.direccion;
            }
            if (cliente.email != null)
            {
                oldCliente.email = cliente.email;
            }
          
            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido modificar el cliente correctamente" });
            }

            return Ok(result);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCliente(int id)
        {
            if(id <= 0)
            {
                return BadRequest(new { mensaje = "Debe introducir el identificador del cliente" });
            }

            Cliente clienteToDelete = await _uow.ClientesRepository.GetById(id);

            if(clienteToDelete == null)
            {
                return BadRequest(new { mensaje = "No existe ese cliente" });
            }
            _uow.ClientesRepository.DeleteCliente(clienteToDelete);
            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido eliminar el cliente correctamente" });
            }

            return Ok(result);

        }
    }
}
