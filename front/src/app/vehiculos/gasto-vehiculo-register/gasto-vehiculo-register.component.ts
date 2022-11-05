import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GastoVehiculo } from 'src/app/Models/gasto-vehiculo.model';
import { MetodoPago } from 'src/app/Models/metodo-pago.model';
import { Vehiculo } from 'src/app/Models/vehiculo.model';
import { GastoVehiculoService } from 'src/app/Services/gasto-vehiculo.service';
import { MetodoPagoService } from 'src/app/Services/metodo-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gasto-vehiculo-register',
  templateUrl: './gasto-vehiculo-register.component.html',
  styleUrls: ['./gasto-vehiculo-register.component.css']
})
export class GastoVehiculoRegisterComponent implements OnInit {

  registroGastoVehiculo: FormGroup
  titulo: string
  boton: string = "add-submit";
  isModificacion: boolean = false
  updatedGasto: GastoVehiculo
  vehiculo: Vehiculo
  metodosPago: MetodoPago[]
  constructor(private fb: FormBuilder, private gastoVehiculoService: GastoVehiculoService, private metodoPagoService: MetodoPagoService) { }

  ngOnInit(): void {
    this.vehiculo = JSON.parse(sessionStorage.getItem('vehiculoGasto'))
    this.titulo = "Crea un gasto para el vehículo " + this.vehiculo.marca + " " + this.vehiculo.modelo + " con matrícula " + this.vehiculo.matricula
    this.cargarFormulario()
  }

  cargarFormulario() {
    this.metodoPagoService.getMetodosPago().subscribe(response => {
      if (response) {
        this.metodosPago = response;
        console.log(this.metodosPago);
      }
    })
    this.registroGastoVehiculo = this.fb.group({
      descripcion: ['', Validators.required],
      importe: [0, Validators.compose([Validators.required, Validators.min(0)])],
      fecha: [Date.now, Validators.required],
      metodoPago: ['', Validators.required],

    })
  }
  onSubmit(form: FormGroup) {
    this.updatedGasto = {
      descripcion: this.registroGastoVehiculo.get('descripcion')?.value as unknown as string,
      importe : this.registroGastoVehiculo.get('importe')?.value as unknown as number,
      fecha : this.registroGastoVehiculo.get('fecha')?.value as unknown as Date,
      vehiculo_id : this.vehiculo.id,
      metodoPago : this.registroGastoVehiculo.get('metodoPago')?.value as unknown as string
    }
    this.gastoVehiculoService.insertGastoVehiculo(this.updatedGasto).subscribe(response => {
      if (response) {
        Swal.fire({
          title: 'El vehículo se ha introducido correctamente',
          icon: 'success'
        })
        this.cargarFormulario();
      }
    })

    }


}
