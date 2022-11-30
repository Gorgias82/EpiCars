using EpicarsAPI.Data;
using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicarsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GastoVehiculoController : Controller
    {

        private readonly IUnitOfWork _uow;

        public GastoVehiculoController(IUnitOfWork uow)
        {
           _uow= uow;
        }

        [HttpGet]
        public async Task<ActionResult<List<GastoVehiculo>>> getGastosVehiculo()
        {        
            return Ok(await _uow.GastoVehiculoRepository.GetGastosVehiculoAsync());
        }

        [HttpPost]
        public async Task<ActionResult> insertGastoVehiculo([FromBody] GastoVehiculo gastoVehiculo)
        {
            if (gastoVehiculo == null) return BadRequest(new { mensaje = "Debe introducir un gasto de vehículo" });

            if (gastoVehiculo.importe <= 0) return BadRequest(new { mensaje = "Debe introducir el importe" });

            var vehiculo = await _uow.VehiculoRepository.GetVehiculoById(gastoVehiculo.vehiculo_id);

            if (vehiculo == null) return BadRequest(new { mensaje = "El gasto debe pertenecer a un vehículo" });

            if(gastoVehiculo.metodoPago == null) return BadRequest(new { mensaje = "Debe introducir el metodo de pago" });

            _uow.GastoVehiculoRepository.InsertGastoVehiculo(gastoVehiculo);
            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido introducir el gasto del vehículo correctamente" });
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult> updateGastoVehiculo([FromBody] GastoVehiculo gastoVehiculo)
        {
            if (gastoVehiculo != null) return BadRequest(new { mensaje = "Tiene que introducir un gasto de vehículo" });

            GastoVehiculo oldGastoVehiculo = await _uow.GastoVehiculoRepository.GetGastoVehiculoById(gastoVehiculo.id);

            if (oldGastoVehiculo == null) return BadRequest(new { mensaje = "El gasto que esta tratando de modificar no existe" });

            if (gastoVehiculo.importe > 0)
            {
                oldGastoVehiculo.importe = gastoVehiculo.importe;
            }

            if (gastoVehiculo.descripcion != null && gastoVehiculo.descripcion.Length > 0)
            {
                oldGastoVehiculo.descripcion = gastoVehiculo.descripcion;
            }

            if (gastoVehiculo.metodoPago != null)
            {
                oldGastoVehiculo.metodoPago = gastoVehiculo.metodoPago;
            }

            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido modificar el gasto correctamente" });
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteGastoVehiculo(int id)
        {
            if (id < 0)
            {
                return BadRequest(new { mensaje = "Debe introducir el identificador del gasto" });
            }

            GastoVehiculo gastoVehiculoToDelete   = await _uow.GastoVehiculoRepository.GetGastoVehiculoById(id);

            if (gastoVehiculoToDelete == null)
            {
                return BadRequest(new { mensaje = "No existe ese gasto" });
            }
            _uow.GastoVehiculoRepository.DeleteGastoVehiculo(gastoVehiculoToDelete);
            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido eliminar el gasto correctamente" });
            }

            return Ok(result);

        }
    }
}
