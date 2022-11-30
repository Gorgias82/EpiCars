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
    public class VehiculoController : ControllerBase
    {

        private readonly IUnitOfWork _uow;

        public VehiculoController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vehiculo>>> GetVehiculos()
        {
           
            return Ok(await _uow.VehiculoRepository.GetVehiculosAsync());
        }

        [HttpPost]
        public async Task<ActionResult> insertVehiculo([FromBody] Vehiculo vehiculo)
        {

            if (vehiculo == null) return BadRequest(new { mensaje = "Debe introducir un vehículo" });

            if(vehiculo.matricula == null || vehiculo.matricula.Length <= 0) return BadRequest(new { mensaje = "Debe introducir una matrícula" });

            if (vehiculo.marca == null || vehiculo.marca.Length <= 0) return BadRequest(new { mensaje = "Debe introducir la marca del vehículo" });

            if (vehiculo.modelo == null || vehiculo.modelo.Length <= 0) return BadRequest(new { mensaje = "Debe introducir el modelo del vehículo" });

            if (vehiculo.bastidor == null || vehiculo.bastidor.Length <= 0 ) return BadRequest(new { mensaje = "Debe introducir el bastidor del vehículo" });

            if (vehiculo.vendedor_id <= 0) return BadRequest(new { mensaje = "Debe introducir el identificador del cliente vendedor" });
         
             
            Cliente vendedor = await _uow.ClientesRepository.GetById((int) vehiculo.vendedor_id);

            if(vendedor == null) return BadRequest(new { mensaje = "No existe ese cliente vendedor" });

            bool existeMatricula = _uow.VehiculoRepository.existeMatricula(vehiculo);

            if(existeMatricula) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con esa matrícula" });

            bool existeBastidor = _uow.VehiculoRepository.existeBastidor(vehiculo);

            if (existeBastidor) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con ese número de bastidor" });



            _uow.VehiculoRepository.InsertVehiculo(vehiculo);
            var result = await _uow.Complete();

            if(result <= 0) return BadRequest(new { mensaje = "No se ha podido introducir el vehículo correctamente" });

            return Ok(result);


        }

        [HttpPut]
        public async Task<ActionResult> updateVehiculo([FromBody] Vehiculo vehiculo)
        {
            if (vehiculo == null) return BadRequest(new { mensaje = "Debe introducir un vehículo" });

            Vehiculo oldVehiculo = await _uow.VehiculoRepository.GetVehiculoById(vehiculo.id);

            if (oldVehiculo == null)
            {
                return BadRequest(new { mensaje = "El vehículo que esta tratando de modificar no existe" });
            }

            if (vehiculo.matricula == null || vehiculo.matricula.Length <= 0) return BadRequest(new { mensaje = "Debe introducir una matrícula" });

            if (vehiculo.marca == null || vehiculo.marca.Length <= 0) return BadRequest(new { mensaje = "Debe introducir la marca del vehículo" });

            oldVehiculo.marca = vehiculo.marca;

            if (vehiculo.modelo == null || vehiculo.modelo.Length <= 0) return BadRequest(new { mensaje = "Debe introducir el modelo del vehículo" });

            oldVehiculo.modelo = vehiculo.modelo;

            if (vehiculo.bastidor == null || vehiculo.bastidor.Length <= 0) return BadRequest(new { mensaje = "Debe introducir el bastidor del vehículo" });

            if (vehiculo.vendedor_id <= 0) return BadRequest(new { mensaje = "Debe introducir el identificador del cliente vendedor" });

            Cliente vendedor = await _uow.ClientesRepository.GetById((int) vehiculo.vendedor_id);

            if (vendedor == null) return BadRequest(new { mensaje = "No existe ese cliente vendedor" });

            oldVehiculo.vendedor_id = vehiculo.vendedor_id;

            bool existeMatricula = _uow.VehiculoRepository.existeMatricula(vehiculo);

            if (existeMatricula) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con esa matrícula" });

            oldVehiculo.matricula = vehiculo.matricula;

            bool existeBastidor = _uow.VehiculoRepository.existeBastidor(vehiculo);

            if (existeBastidor) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con ese número de bastidor" });

            oldVehiculo.bastidor = vehiculo.bastidor;

            if (vehiculo.kilometraje > 0) oldVehiculo.kilometraje = vehiculo.kilometraje;

            oldVehiculo.matriculacion = vehiculo.matriculacion;

            oldVehiculo.itv = vehiculo.itv;

            if(vehiculo.precioCompra > 0) oldVehiculo.precioCompra = vehiculo.precioCompra;

            if (vehiculo.precioVenta > 0) oldVehiculo.precioVenta = vehiculo.precioVenta;

            oldVehiculo.fechaCompra = vehiculo.fechaCompra;

            oldVehiculo.fechaVenta = vehiculo.fechaVenta;

            if (vehiculo.imagen != null) oldVehiculo.imagen = vehiculo.imagen;

            if(vehiculo.url_documentacion != null) oldVehiculo.url_documentacion = vehiculo.url_documentacion;

            oldVehiculo.gestionVenta = vehiculo.gestionVenta;

            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido modificar el vehículo correctamente" });
            }

            return Ok(result);


        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehiculo(int id)
        {
            if (id  <= 0)
            {
                return BadRequest(new { mensaje = "Debe introducir el identificador del vehículo" });
            }

            Vehiculo vehiculoToDelete = await _uow.VehiculoRepository.GetVehiculoById(id);

            if (vehiculoToDelete == null)
            {
                return BadRequest(new { mensaje = "No existe ese vehículo" });
            }
            _uow.VehiculoRepository.DeleteVehiculo(vehiculoToDelete);
            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido eliminar el vehículo correctamente" });
            }

            return Ok(result);

        }



    }
}
