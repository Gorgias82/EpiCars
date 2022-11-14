using EpicarsAPI.Data;
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
        private readonly epicars_Context _context;

        public VentaController(epicars_Context context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Venta>>> GetVentas()
        {
            List<Venta> ventas;

            ventas = await _context.Venta
                .ToListAsync();

            return Ok(ventas);
        }

        [HttpPost]
        public async Task<ActionResult> insertVenta([FromBody] Venta venta)
        {
            if (venta == null) return BadRequest(new { mensaje = "Debe introducir los datos de la venta" });

            if(venta.importe <=  0) return BadRequest(new { mensaje = "Debe introducir el importe de la venta" });

            if(venta.metodoPago == null || venta.metodoPago.Length <= 0) return BadRequest(new { mensaje = "Debe introducir el método de pago" });

            if (venta.vehiculo_id <= 0) return BadRequest(new { mensaje = "Debe introducir el vehiculo"  });

            if (venta.comprador_id <= 0) return BadRequest(new { mensaje = "Debe introducir el cliente comprador" });

            var comprador = _context.Cliente
                                .Where(c => c.id == venta.comprador_id)
                                .SingleOrDefault();

            if(comprador == null ) return BadRequest(new { mensaje = "El cliente comprador no esta registrado" });


            var vehiculo = _context.Vehiculo
                                   .Where(v => v.id == venta.vehiculo_id)
                                   .SingleOrDefault();
            if (vehiculo != null)
            {
                if(vehiculo.vendido == false || vehiculo.vendido == null)
                {
                    vehiculo.vendido = true;
                    vehiculo.precioVenta = venta.importe;
                    vehiculo.fechaVenta = DateTime.Now;
                    vehiculo.comprador_id = venta.comprador_id;
                    _context.SaveChanges();
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


            _context.Venta.Add(venta);
            var result = await _context.SaveChangesAsync();

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

            Venta oldVenta = _context.Venta.Where(v => v.id == venta.id).FirstOrDefault();

            if(oldVenta == null) return BadRequest(new { mensaje = "La venta que esta tratando de modificar no existe" });

            var comprador = _context.Cliente
                                .Where(c => c.id == venta.comprador_id)
                                .SingleOrDefault();

            if (comprador == null) return BadRequest(new { mensaje = "El cliente comprador no esta registrado" });

            oldVenta.importe = venta.importe;
            oldVenta.metodoPago = venta.metodoPago;
            oldVenta.garantia = venta.garantia;
            oldVenta.esFinanciado = venta.esFinanciado;
            oldVenta.importeFinanciado = venta.importeFinanciado;
            oldVenta.comprador_id = venta.comprador_id;


            var result = await _context.SaveChangesAsync();

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

            Venta ventaToDelete = _context.Venta.Where(v => v.id == id).SingleOrDefault();

            if (ventaToDelete == null)
            {
                return BadRequest(new { mensaje = "No existe esa venta" });
            }

            var vehiculo = _context.Vehiculo
                                  .Where(v => v.id == ventaToDelete.vehiculo_id)
                                  .SingleOrDefault();
            if (vehiculo != null)
            {             
                    vehiculo.vendido = false;
                    vehiculo.fechaVenta = null;
                    vehiculo.comprador_id = null;
                    _context.SaveChanges();
            
            }
            else
            {
                return BadRequest(new { mensaje = "No existe el vehículo introducido" });
            }

            _context.Venta.Remove(ventaToDelete);
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest(new { mensaje = "No se ha podido eliminar la venta correctamente" });
            }

            return Ok(result);
        }
    }
}
