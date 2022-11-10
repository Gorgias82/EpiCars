import { ThisReceiver } from '@angular/compiler';
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
    this.cargarFormulario()
  }

  cargarFormulario() {
    this.titulo = "Crea un gasto para el vehículo " + this.vehiculo.marca + " " + this.vehiculo.modelo + " con matrícula " + this.vehiculo.matricula
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

    this.comprobarIsModificacion()
  }

  comprobarIsModificacion(){
      if(sessionStorage.getItem("updatedGastoVehiculo")){
        this.updatedGasto = JSON.parse(sessionStorage.getItem('updatedGastoVehiculo'))
        this.isModificacion = true
        this.titulo = this.titulo.replace("Crea ", "Modifica ")
        this.boton = "modify-submit"
        var fechaGasto = this.updatedGasto.fecha == null ? null : this.updatedGasto.fecha
        this.registroGastoVehiculo.setValue({
          descripcion : this.updatedGasto.descripcion,
          importe : this.updatedGasto.importe,
          fecha : fechaGasto,
          metodoPago : this.updatedGasto.metodoPago
        })
        sessionStorage.removeItem("updatedGastoVehiculo")
      }
  }
  onSubmit(form: FormGroup) {
    this.updatedGasto = {
      descripcion: this.registroGastoVehiculo.get('descripcion')?.value as unknown as string,
      importe : this.registroGastoVehiculo.get('importe')?.value as unknown as number,
      fecha : this.registroGastoVehiculo.get('fecha')?.value as unknown as Date,
      vehiculo_id : this.vehiculo.id,
      metodoPago : this.registroGastoVehiculo.get('metodoPago')?.value as unknown as string
    }
    if(this.isModificacion){
      this.gastoVehiculoService.updateGastoVehiculo(this.updatedGasto).subscribe(response => {
        if (response) {
          Swal.fire({
            title: 'El gasto se ha modificado correctamente',
            icon: 'success'
          })
          this.isModificacion = false;
          this.cargarFormulario();
        }
      })
    }else{
      this.gastoVehiculoService.insertGastoVehiculo(this.updatedGasto).subscribe(response => {
        if (response) {
          Swal.fire({
            title: 'El gasto se ha introducido correctamente',
            icon: 'success'
          })
          this.cargarFormulario();
        }
      })
    }


    }


}
