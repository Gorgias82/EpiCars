using EpicarsAPI.Data;
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

        private readonly epicars_Context _context;

        public VehiculoController(epicars_Context context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Vehiculo>>> GetVehiculos()
        {
            List<Vehiculo> vehiculos;

            vehiculos = await _context.Vehiculo.ToListAsync();

            return Ok(vehiculos);
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

            Cliente vendedor = _context.Cliente.Where(c => c.id == vehiculo.vendedor_id).FirstOrDefault();

            if(vendedor == null) return BadRequest(new { mensaje = "No existe ese cliente vendedor" });

            Vehiculo existeMatricula = _context.Vehiculo.Where(v => v.matricula.ToUpper() == vehiculo.matricula.ToUpper()).FirstOrDefault();

            if(existeMatricula != null) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con esa matrícula" });

            Vehiculo existeBastidor = _context.Vehiculo.Where(v => v.bastidor.ToUpper() == vehiculo.bastidor.ToUpper()).FirstOrDefault();

            if (existeBastidor != null) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con ese número de bastidor" });

            _context.Vehiculo.Add(vehiculo);
            var result = await _context.SaveChangesAsync();

            if(result <= 0) return BadRequest(new { mensaje = "No se ha podido introducir el vehículo correctamente" });

            return Ok(result);


        }

        [HttpPut]
        public async Task<ActionResult> updateVehiculo(Vehiculo vehiculo)
        {
            if (vehiculo == null) return BadRequest(new { mensaje = "Debe introducir un vehículo" });

            Vehiculo oldVehiculo = _context.Vehiculo.Where(v => v.id == vehiculo.id).FirstOrDefault();

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

            Cliente vendedor = _context.Cliente.Where(c => c.id == vehiculo.vendedor_id).FirstOrDefault();

            if (vendedor == null) return BadRequest(new { mensaje = "No existe ese cliente vendedor" });

            oldVehiculo.vendedor_id = vehiculo.vendedor_id;

            Vehiculo existeMatricula = _context.Vehiculo.Where(v => v.matricula.ToUpper() == vehiculo.matricula.ToUpper()).FirstOrDefault();

            if (existeMatricula != null && existeMatricula.matricula.ToUpper() != vehiculo.matricula.ToUpper()) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con esa matrícula" });

            oldVehiculo.matricula = vehiculo.matricula;

            Vehiculo existeBastidor = _context.Vehiculo.Where(v => v.bastidor.ToUpper() == vehiculo.bastidor.ToUpper()).FirstOrDefault();

            if (existeBastidor != null && existeBastidor.bastidor.ToUpper() != vehiculo.bastidor.ToUpper()) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con ese número de bastidor" });

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

            var result = await _context.SaveChangesAsync();

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

            Vehiculo vehiculoToDelete = _context.Vehiculo.Where(v => v.id == id).SingleOrDefault();

            if (vehiculoToDelete == null)
            {
                return BadRequest(new { mensaje = "No existe ese vehículo" });
            }
            _context.Vehiculo.Remove(vehiculoToDelete);
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido eliminar el vehículo correctamente" });
            }

            return Ok(result);

        }



    }
}
