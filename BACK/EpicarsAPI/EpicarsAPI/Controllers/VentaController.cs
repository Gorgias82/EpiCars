using EpicarsAPI.Data;
using EpicarsAPI.Interfaces;
using EpicarsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicarsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public VentaController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<ActionResult<List<Venta>>> GetVentas()
        {       
            return Ok(await _uow.VentaRepository.GetVentasAsync());
        }

        [HttpPost]
        public async Task<ActionResult> insertVenta([FromBody] Venta venta)
        {
            if (venta == null) return BadRequest(new { mensaje = "Debe introducir los datos de la venta" });

            if(venta.importe <=  0) return BadRequest(new { mensaje = "Debe introducir el importe de la venta" });

            if(venta.metodoPago == null || venta.metodoPago.Length <= 0) return BadRequest(new { mensaje = "Debe introducir el método de pago" });

            if (venta.vehiculo_id <= 0) return BadRequest(new { mensaje = "Debe introducir el vehiculo"  });

            if (venta.comprador_id <= 0) return BadRequest(new { mensaje = "Debe introducir el cliente comprador" });

            var comprador = _uow.ClientesRepository.GetById(venta.comprador_id);

            if(comprador == null ) return BadRequest(new { mensaje = "El cliente comprador no esta registrado" });

            var vehiculo = await _uow.VehiculoRepository.GetVehiculoById(venta.vehiculo_id);

            if (vehiculo != null)
            {
                if(vehiculo.vendido == false || vehiculo.vendido == null)
                {
                    vehiculo.vendido = true;
                    vehiculo.precioVenta = venta.importe;
                    vehiculo.fechaVenta = DateTime.Today;
                    vehiculo.comprador_id = venta.comprador_id;
                    await _uow.Complete();
                }
                else
                {
                    return BadRequest(new { mensaje = "El vehículo introducido ya esta vendido" });
                }        
            }
            else
            {
                return BadRequest(new { mensaje = "No existe el vehículo introducido" });
            }

            _uow.VentaRepository.InsertVenta(venta);
            var result = await _uow.Complete();

            if (result <= 0) return BadRequest(new { mensaje = "No se ha podido introducir la venta correctamente" });

            return Ok(result);

        }

        [HttpPut]
        public async Task<ActionResult> updateVenta([FromBody] Venta venta)
        {
            if(venta == null) return BadRequest(new { mensaje = "Debe introducir los datos de la venta" });

            if (venta.importe <= 0) return BadRequest(new { mensaje = "Debe introducir el importe de la venta" });

            if (venta.metodoPago == null || venta.metodoPago.Length <= 0) return BadRequest(new { mensaje = "Debe introducir el método de pago" });

            if (venta.vehiculo_id <= 0) return BadRequest(new { mensaje = "Debe introducir el vehiculo" });

            if (venta.comprador_id <= 0) return BadRequest(new { mensaje = "Debe introducir el cliente comprador" });

            Venta oldVenta = await _uow.VentaRepository.GetVentaById(venta.id);

            if(oldVenta == null) return BadRequest(new { mensaje = "La venta que esta tratando de modificar no existe" });

            var comprador = _uow.ClientesRepository.GetById(venta.comprador_id);

            if (comprador == null) return BadRequest(new { mensaje = "El cliente comprador no esta registrado" });

            oldVenta.importe = venta.importe;
            oldVenta.metodoPago = venta.metodoPago;
            oldVenta.garantia = venta.garantia;
            oldVenta.esFinanciado = venta.esFinanciado;
            oldVenta.importeFinanciado = venta.importeFinanciado;
            oldVenta.comprador_id = venta.comprador_id;

            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido modificar la venta correctamente" });
            }

            return Ok(result);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVenta(int id)
        {
            if( id <= 0)
            {
                return BadRequest(new { mensaje = "Debe introducir el identificador de la venta" });
            }

            Venta ventaToDelete = await _uow.VentaRepository.GetVentaById(id);

            if (ventaToDelete == null)
            {
                return BadRequest(new { mensaje = "No existe esa venta" });
            }

            var vehiculo = await _uow.VehiculoRepository.GetVehiculoById(ventaToDelete.vehiculo_id);

            if (vehiculo != null)
            {             
                vehiculo.vendido = false;
                vehiculo.fechaVenta = null;
                vehiculo.comprador_id = null;
                await _uow.Complete();         
            }
            else
            {
                return BadRequest(new { mensaje = "No existe el vehículo introducido" });
            }

            _uow.VentaRepository.DeleteVenta(ventaToDelete);
            var result = await _uow.Complete();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido eliminar la venta correctamente" });
            }

            return Ok(result);
        }
    }
}
