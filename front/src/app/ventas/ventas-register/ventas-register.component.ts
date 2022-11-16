import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente.model';
import { MetodoPago } from 'src/app/Models/metodo-pago.model';
import { Vehiculo } from 'src/app/Models/vehiculo.model';
import { Venta } from 'src/app/Models/venta.model';
import { ClientesService } from 'src/app/Services/clientes.service';
import { MetodoPagoService } from 'src/app/Services/metodo-pago.service';

@Component({
  selector: 'app-ventas-register',
  templateUrl: './ventas-register.component.html',
  styleUrls: ['./ventas-register.component.css']
})
export class VentasRegisterComponent implements OnInit {
  titulo : string
  registroVenta : FormGroup
  cliente : Cliente;
  updatedCliente : Cliente;
  metodosPago : MetodoPago[]
  updatedVehiculo : Vehiculo
  updatedVenta : Venta
  esFinanciado : boolean = false
  constructor(private fb : FormBuilder, private metodoPagoService : MetodoPagoService, public clientesService : ClientesService, private router : Router) { }

  ngOnInit(): void {
    this.cargarFormulario()
  }

  cargarFormulario(){
    this.metodoPagoService.getMetodosPago().subscribe(response => {
      if (response) {
        this.metodosPago = response;
      }
    })
    var precioVenta = 0
    if (sessionStorage.getItem("VehiculoVenta")){
      this.updatedVehiculo = JSON.parse(sessionStorage.getItem('VehiculoVenta'))
      precioVenta = this.updatedVehiculo.precioVenta
      this.titulo = "Registra la venta del vehículo " + this.updatedVehiculo.marca + " " + this.updatedVehiculo.modelo + " con matrícula " + this.updatedVehiculo.matricula
    }
    this.registroVenta = this.fb.group({
      importe: [precioVenta, Validators.compose([Validators.required, Validators.min(0)])],
      metodoPago: ['', Validators.required],
      garantia: [0, Validators.min(0)],
      esFinanciado: [false, ],
      importeFinanciado: [0, Validators.min(0)]     
    });

    this.comprobarCliente()
  }

  setFinanciado(){
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

  comprobarCliente(){
    if(sessionStorage.getItem("formVenta")){
      this.updatedVenta = JSON.parse(sessionStorage.getItem('formVenta'))
      this.esFinanciado = this.updatedVenta.esFinanciado
      this.registroVenta.setValue({
        importe : this.updatedVenta.importe,
        metodoPago : this.updatedVenta.metodoPago,
        garantia : this.updatedVenta.garantia,
        esFinanciado : this.updatedVenta.esFinanciado,
        importeFinanciado : this.updatedVenta.importeFinanciado,
        vehiculo_id : this.updatedVenta.vehiculo_id,
      })
      sessionStorage.removeItem('formVenta')
    }
  }

  onSubmit(form : FormGroup){

  }

  ngOnDestroy(){
   
  }


}
