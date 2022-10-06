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
    public class ClienteController : ControllerBase
    {

        private readonly epicars_Context _context;

        public ClienteController(epicars_Context context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> GetClientes()
        {
            List<Cliente> clientes;

            clientes = await _context.Cliente.ToListAsync();

            return Ok(clientes);
        }
    }
}
