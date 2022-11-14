using System.ComponentModel.DataAnnotations;

namespace EpicarsAPI.Models
{
    public class Venta
    {
        [Key]
        public int id { get; set; }
        public int importe { get; set; }
        public string metodoPago { get; set; }
        public decimal garantia { get; set; }
        public bool esFinanciado { get; set; }
        public decimal importeFinanciado { get; set; }
        public int vehiculo_id { get; set; }
        public int comprador_id { get; set; }
    }
}
