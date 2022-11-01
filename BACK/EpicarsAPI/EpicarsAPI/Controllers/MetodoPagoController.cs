using EpicarsAPI.Data;
using EpicarsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicarsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetodoPagoController : Controller
    {
        private readonly epicars_Context _context;

        public MetodoPagoController(epicars_Context context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<MetodoPago>>> getMetodosPago()
        {
            List<MetodoPago> metodosPago = await _context.MetodoPago.ToListAsync();

            return Ok(metodosPago);
        }

    }
}
