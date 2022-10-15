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

            if (vehiculo.comprador_id <= 0) return BadRequest(new { mensaje = "Debe introducir el identificador del comprador" });

            Cliente comprador = _context.Cliente.Where(c => c.id == vehiculo.comprador_id).FirstOrDefault();

            if(comprador == null) return BadRequest(new { mensaje = "No existe ese cliente" });

            Vehiculo existeMatricula = _context.Vehiculo.Where(v => v.matricula == vehiculo.matricula).FirstOrDefault();

            if(existeMatricula != null) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con esa matrícula" });

            Vehiculo existeBastidor = _context.Vehiculo.Where(v => v.bastidor == vehiculo.bastidor).FirstOrDefault();

            if (existeBastidor != null) return BadRequest(new { mensaje = "Ya hay un vehículo registrado con ese número de bastidor" });

            _context.Vehiculo.Add(vehiculo);
            var result = await _context.SaveChangesAsync();

            if(result <= 0) return BadRequest(new { mensaje = "No se ha podido introducir el vehículo correctamente" });

            return Ok(result);



        }


        
    }
}
