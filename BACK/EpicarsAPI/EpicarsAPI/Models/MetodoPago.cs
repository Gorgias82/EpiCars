using System.ComponentModel.DataAnnotations;

namespace EpicarsAPI.Models
{
    public class MetodoPago
    {
        [Key]
        public int id { get; set; }

        public string metodo { get; set; }

        //public GastoVehiculo[] gastosVehiculo { get; set; }
    }
}
