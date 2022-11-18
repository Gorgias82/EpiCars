import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente.model';
import { MetodoPago } from 'src/app/Models/metodo-pago.model';
import { Vehiculo } from 'src/app/Models/vehiculo.model';
import { Venta } from 'src/app/Models/venta.model';
import { ClientesService } from 'src/app/Services/clientes.service';
import { MetodoPagoService } from 'src/app/Services/metodo-pago.service';
import { VentaService } from 'src/app/Services/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-register',
  templateUrl: './ventas-register.component.html',
  styleUrls: ['./ventas-register.component.css']
})
export class VentasRegisterComponent implements OnInit {
  titulo: string
  registroVenta: FormGroup
  cliente: Cliente;
  updatedCliente: Cliente;
  metodosPago: MetodoPago[]
  updatedVehiculo: Vehiculo
  updatedVenta: Venta
  esFinanciado: boolean = false
  constructor(private fb: FormBuilder, private metodoPagoService: MetodoPagoService, public clientesService: ClientesService, private router: Router, private ventasService: VentaService) { }

  ngOnInit(): void {
    this.cargarFormulario()
  }

  cargarFormulario() {
    this.metodoPagoService.getMetodosPago().subscribe(response => {
      if (response) {
        this.metodosPago = response;
      }
    })
    var precioVenta = 0
    if (sessionStorage.getItem("VehiculoVenta")) {
      this.updatedVehiculo = JSON.parse(sessionStorage.getItem('VehiculoVenta'))
      precioVenta = this.updatedVehiculo.precioVenta
      this.titulo = "Registra la venta del vehículo " + this.updatedVehiculo.marca + " " + this.updatedVehiculo.modelo + " con matrícula " + this.updatedVehiculo.matricula
    }
    this.registroVenta = this.fb.group({
      importe: [precioVenta, Validators.compose([Validators.required, Validators.min(0)])],
      metodoPago: ['', Validators.required],
      garantia: [0, Validators.min(0)],
      esFinanciado: [false,],
      importeFinanciado: [0, Validators.min(0)]
    });

    this.comprobarCliente()
  }

  setFinanciado() {
    this.esFinanciado = this.registroVenta.get('esFinanciado')?.value as unknown as boolean
    console.log(this.esFinanciado)
  }
  seleccionaCliente() {
    this.updatedVenta = {
      importe: this.registroVenta.get('importe')?.value as unknown as number,
      metodoPago: this.registroVenta.get('metodoPago')?.value as unknown as string,
      garantia: this.registroVenta.get('garantia')?.value as unknown as number,
      esFinanciado: this.registroVenta.get('esFinanciado')?.value as unknown as boolean,
      importeFinanciado: this.registroVenta.get('importeFinanciado')?.value as unknown as number,
      vehiculo_id: this.updatedVehiculo.id,
      comprador_id: 0,

    }
    sessionStorage.setItem("formVenta", JSON.stringify(this.updatedVenta));
    this.router.navigateByUrl('clientes/list');
  }

  comprobarCliente() {
    if (sessionStorage.getItem("formVenta")) {
      this.updatedVenta = JSON.parse(sessionStorage.getItem('formVenta'))
      this.esFinanciado = this.updatedVenta.esFinanciado
      this.registroVenta.setValue({
        importe: this.updatedVenta.importe,
        metodoPago: this.updatedVenta.metodoPago,
        garantia: this.updatedVenta.garantia,
        esFinanciado: this.updatedVenta.esFinanciado,
        importeFinanciado: this.updatedVenta.importeFinanciado,
      })
      sessionStorage.removeItem('formVenta')
    }
  }

  onSubmit(form: FormGroup) {
    var importeTotal = this.registroVenta.get('importe')?.value as unknown as number
    if (this.registroVenta.get('esFinanciado')?.value as unknown as boolean === true && this.registroVenta.get('importeFinanciado')?.value as unknown as number <= 0) {
      Swal.fire({
        title: 'Si selecciona financiacion debe introducir algun importe a financiar',
        icon: 'error'
      })
    } else if (this.registroVenta.get('importeFinanciado')?.value as unknown as number  > importeTotal) {
      Swal.fire({
        title: 'error',
        text: 'El importe financiado no puede ser mayor que el importe total',
        icon: 'error'
      })
    } else {
      Swal.fire({
        title: "¿Esta seguro que quiere vender el vehículo " + this.updatedVehiculo.marca + " " + this.updatedVehiculo.modelo + " con matrícula " + this.updatedVehiculo.matricula + "?",
        text: "Sera clasificado como vendido",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Si, véndelo",
        cancelButtonText: 'No, he cambiado de opinión'
      }).then((result) => {

        if (result.value) {
     
          this.clientesService.currentClient$.subscribe(response => {
            if (response) {
              this.updatedVenta = {
                importe: this.registroVenta.get('importe')?.value as unknown as number,
                metodoPago: this.registroVenta.get('metodoPago')?.value as unknown as string,
                garantia: this.registroVenta.get('garantia')?.value as unknown as number,
                esFinanciado: this.registroVenta.get('esFinanciado')?.value as unknown as boolean,
                importeFinanciado: this.registroVenta.get('importeFinanciado')?.value as unknown as number,
                vehiculo_id: this.updatedVehiculo.id,
                comprador_id: response.id

              }
              console.log(this.updatedVenta)
              this.ventasService.insertVenta(this.updatedVenta).subscribe(response => {
                if (response) {
                  Swal.fire({
                    title: "Se ha registrado la venta correctamente",
                    icon: 'success'
                  })
                }
              })


            }
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Operación cancelada',
            'No se ha registrado la venta'
          )
        }
      })
    }





  }

  ngOnDestroy() {

  }


}
