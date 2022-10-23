﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EpicarsAPI.Models
{
    public class GastoVehiculo
    {
        [Key]
        public int id { get; set; }
        public decimal importe { get; set; }
        public DateTime fecha { get; set; }
        public int metodoPago { get; set; }
        public int vehiculo_id { get; set; }
        public string descripcion { get; set; }
        public virtual Vehiculo vehiculo { get; set; }


    }
}
