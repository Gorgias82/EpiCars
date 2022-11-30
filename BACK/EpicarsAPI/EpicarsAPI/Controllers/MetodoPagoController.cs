using EpicarsAPI.Data;
using EpicarsAPI.Interfaces;
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
        private readonly IUnitOfWork _uow;

        public MetodoPagoController(IUnitOfWork uow)
        {
            _uow= uow;

        }

        [HttpGet]
        public async Task<ActionResult<List<MetodoPago>>> getMetodosPago()
        {
            return Ok(await _uow.MetodoPagoRepository.GetMetodoPagosAsync());
        }

    }
}
