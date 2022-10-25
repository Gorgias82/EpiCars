import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/Services/clientes.service';

@Component({
  selector: 'app-vehiculos-register',
  templateUrl: './vehiculos-register.component.html',
  styleUrls: ['./vehiculos-register.component.css']
})
export class VehiculosRegisterComponent implements OnInit {
  registroVehiculo: FormGroup
  titulo : string = "Crea un vehículo"
  boton : string
  constructor(private fb: FormBuilder,public clientesService : ClientesService, private router :Router) { }

  ngOnInit(): void {
    this.cargarFormulario()
  }

  cargarFormulario() {
    this.registroVehiculo = this.fb.group({
      matricula: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      bastidor: ['', Validators.compose([Validators.required])],
      kilometraje: [0, ],
      matriculacion: [Date.now, Validators.compose([Validators.required])],
      itv: [Date.now, Validators.compose([Validators.required])],
      fechaCompra: [Date.now, Validators.compose([Validators.required])],
      precioCompra: [0, ],
      precioVenta: [0, ],
      gestionVenta : [false, ],
      vendedor_id : [0, ]
    })
     

  }

  seleccionaCliente(){
    this.router.navigateByUrl('clientes/list');
  }

  onSubmit(form : FormGroup){

  }
}
