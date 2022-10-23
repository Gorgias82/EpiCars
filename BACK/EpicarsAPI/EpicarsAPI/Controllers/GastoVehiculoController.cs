using EpicarsAPI.Data;
using EpicarsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicarsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GastoVehiculoController : Controller
    {

        private readonly epicars_Context _context;

        public GastoVehiculoController(epicars_Context context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<GastoVehiculo>>> getGastosVehiculo()
        {
            List<GastoVehiculo> gastosVehiculo;

            gastosVehiculo =  await _context.GastoVehiculo.ToListAsync();

            return Ok(gastosVehiculo);
        }

        [HttpPost]
        public async Task<ActionResult> insertGastoVehiculo([FromBody] GastoVehiculo gastoVehiculo)
        {
            if (gastoVehiculo == null) return BadRequest(new { mensaje = "Debe introducir un gasto de vehículo" });

            if (gastoVehiculo.importe <= 0) return BadRequest(new { mensaje = "Debe introducir el importe" });

            _context.GastoVehiculo.Add(gastoVehiculo);
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido introducir el gasto del vehículo correctamente" });
            }

            return Ok(result);
        }
    }
}
