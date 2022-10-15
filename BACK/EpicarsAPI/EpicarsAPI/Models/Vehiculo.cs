using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace EpicarsAPI.Models
{
    public class Vehiculo
    {

        [Key]
        public int id { get; set; }
        public string matricula { get; set; }
        public string marca { get; set; }
        public string modelo { get; set; }
        public string bastidor { get; set; }
        public int kilometraje { get; set; }
        public DateTime matriculacion { get; set; }
        public DateTime itv { get; set; }
        public decimal precioCompra { get; set; }
        public decimal precioVenta { get; set; }
        public DateTime fechaCompra { get; set; }
        public DateTime fechaVenta { get; set; }
        public string imagen { get; set; }
        public string url_documentacion { get; set; }
        public Boolean gestionVenta { get; set; }
        public int vendedor_id { get; set; }
        public int comprador_id { get; set; }



    }
}
