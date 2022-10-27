import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { Vehiculo } from 'src/app/Models/vehiculo.model';
import { ClientesService } from 'src/app/Services/clientes.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-vehiculos-register',
  templateUrl: './vehiculos-register.component.html',
  styleUrls: ['./vehiculos-register.component.css']
})
export class VehiculosRegisterComponent implements OnInit {
  registroVehiculo: FormGroup
  titulo: string = "Crea un vehículo"
  boton: string
  isModificacion: boolean = false
  updatedVehiculo: Vehiculo
  constructor(private fb: FormBuilder, public clientesService: ClientesService, private router: Router, private vehiculosService: VehiculoService) { }

  ngOnInit(): void {
    this.cargarFormulario()
  }

  cargarFormulario() {

    this.registroVehiculo = this.fb.group({
      matricula: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      bastidor: ['', Validators.compose([Validators.required])],
      kilometraje: [0,],
      matriculacion: [Date.now, Validators.compose([Validators.required])],
      itv: [Date.now, Validators.compose([Validators.required])],
      fechaCompra: [Date.now, Validators.compose([Validators.required])],
      precioCompra: [0,],
      precioVenta: [0,],
      gestionVenta: [false,],
      vendedor_id: [0, Validators.min(1)]
    })

    this.comprobarCliente()


  }

  comprobarCliente() {
    if (sessionStorage.getItem("formVehiculo")) {
      this.updatedVehiculo = JSON.parse(sessionStorage.getItem('formVehiculo'))
      console.log(this.updatedVehiculo.matriculacion)
      var matriculacion = this.updatedVehiculo.matriculacion == null ? null : this.updatedVehiculo.matriculacion
      var itv = this.updatedVehiculo.itv == null ? null : this.updatedVehiculo.itv
      var fechaCompra = this.updatedVehiculo.fechaCompra == null ? null : this.updatedVehiculo.fechaCompra
      this.registroVehiculo.setValue({
        matricula: this.updatedVehiculo.matricula,
        marca: this.updatedVehiculo.marca,
        modelo: this.updatedVehiculo.modelo,
        bastidor: this.updatedVehiculo.bastidor,
        kilometraje: this.updatedVehiculo.kilometraje,
        matriculacion: matriculacion,
        itv: itv,
        fechaCompra: fechaCompra,
        precioCompra: this.updatedVehiculo.precioCompra,
        precioVenta: this.updatedVehiculo.precioVenta,
        gestionVenta: this.updatedVehiculo.gestionVenta,
        vendedor_id: 0
      })

      sessionStorage.removeItem("formVehiculo")
    }

  }

  seleccionaCliente() {
    this.updatedVehiculo = {
      matricula: this.registroVehiculo.get('matricula')?.value as unknown as string,
      marca: this.registroVehiculo.get('marca')?.value as unknown as string,
      modelo: this.registroVehiculo.get('modelo')?.value as unknown as string,
      bastidor: this.registroVehiculo.get('bastidor')?.value as unknown as string,
      kilometraje: this.registroVehiculo.get('kilometraje')?.value as unknown as number,
      matriculacion: this.registroVehiculo.get('matriculacion')?.value as unknown as Date,
      itv: this.registroVehiculo.get('itv')?.value as unknown as Date,
      precioCompra: this.registroVehiculo.get('precioCompra')?.value as unknown as number,
      precioVenta: this.registroVehiculo.get('precioVenta')?.value as unknown as number,
      fechaCompra: this.registroVehiculo.get('fechaCompra')?.value as unknown as Date,
      fechaVenta: this.registroVehiculo.get('fechaVenta')?.value as unknown as Date,
      gestionVenta: this.registroVehiculo.get('gestionVenta').value as unknown as boolean,
      vendedor_id: 0,
      gastos: []
    }
    sessionStorage.setItem("formVehiculo", JSON.stringify(this.updatedVehiculo));
    this.router.navigateByUrl('clientes/list');
  }

  onSubmit(form: FormGroup) {
    this.clientesService.currentClient$.subscribe(response => {
      if (response) {
        this.updatedVehiculo = {
          matricula: this.registroVehiculo.get('matricula')?.value as unknown as string,
          marca: this.registroVehiculo.get('marca')?.value as unknown as string,
          modelo: this.registroVehiculo.get('modelo')?.value as unknown as string,
          bastidor: this.registroVehiculo.get('bastidor')?.value as unknown as string,
          kilometraje: this.registroVehiculo.get('kilometraje')?.value as unknown as number,
          matriculacion: this.registroVehiculo.get('matriculacion')?.value as unknown as Date,
          itv: this.registroVehiculo.get('itv')?.value as unknown as Date,
          precioCompra: this.registroVehiculo.get('precioCompra')?.value as unknown as number,
          precioVenta: this.registroVehiculo.get('precioVenta')?.value as unknown as number,
          fechaCompra: this.registroVehiculo.get('fechaCompra')?.value as unknown as Date,
          fechaVenta: this.registroVehiculo.get('fechaVenta')?.value as unknown as Date,
          gestionVenta: this.registroVehiculo.get('gestionVenta').value as unknown as boolean,
          vendedor_id: response.id as unknown as number,
          gastos: []
        }
        console.log(this.updatedVehiculo)
        this.vehiculosService.insertVehiculo(this.updatedVehiculo).subscribe(response => {
          if (response) {
            Swal.fire({
              title: 'El cliente se ha introducido correctamente',
              icon: 'success'
            })
            this.cargarFormulario();
          }
        })
      }
    })



  }
}