import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/Services/vehiculo.service';

@Component({
  selector: 'app-vehiculos-main',
  templateUrl: './vehiculos-main.component.html',
  styleUrls: ['./vehiculos-main.component.css']
})
export class VehiculosMainComponent implements OnInit {

  constructor(private vehiculosService : VehiculoService) { }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(){
    this.vehiculosService.getVehiculos().subscribe(response => {
      if(response){
        console.log(response);
      }
    })
  }

}
