import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Vehiculo } from 'src/app/Models/vehiculo.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ClientesService } from 'src/app/Services/clientes.service';
import Swal from 'sweetalert2';
import { GastoVehiculoService } from 'src/app/Services/gasto-vehiculo.service';
import { VehiculosRegisterComponent } from '../vehiculos-register/vehiculos-register.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vehiculos-main',
  templateUrl: './vehiculos-main.component.html',
  styleUrls: ['./vehiculos-main.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VehiculosMainComponent implements OnInit {


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  public cargado: boolean = false;
  dsVehiculos: Vehiculo[]
  dataSource: MatTableDataSource<Vehiculo>
  columnsToDisplay: string[] = ['matricula', 'marca', 'modelo', 'bastidor', 'kilometraje',
    'matriculacion', 'itv', 'precioCompra', 'precioVenta', 'fechaCompra', 'fechaVenta', 'gestionVenta','vendido', 'iconos']
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedElement: Vehiculo | null = null;
  columnsToDisplayGastos: string[] = ['descripcion', 'importe', 'fecha', 'metodoPago', 'iconos']
  updatedVehiculo: Vehiculo
  vehiculoGasto :  Vehiculo
  opcionesVisualizacion = this.fb.group({
    mostrarVendidos : false
  }) 
  constructor(private fb : FormBuilder, private vehiculosService: VehiculoService, private router: Router, private clientesService: ClientesService, private gastoVehiculoService: GastoVehiculoService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarVehiculos();

    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
    }
  }

  mostrarVendidos(){
    console.log(this.opcionesVisualizacion.get('mostrarVendidos'))
  }

  cargarVehiculos() {
    this.vehiculosService.getVehiculos().subscribe(response => {
      if (response) {
        console.log(this.opcionesVisualizacion.get('mostrarVendidos').value);
        this.dsVehiculos = response
        if(this.opcionesVisualizacion.get('mostrarVendidos').value == false){         
          this.dsVehiculos = this.dsVehiculos.filter(v => v.vendido == undefined || v.vendido == null || v.vendido == false)
        }
        this.dataSource = new MatTableDataSource<Vehiculo>(this.dsVehiculos)
        this.dataSource.paginator = this.paginator
        this.cargado = true;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  desplegarDetalles(e) {

    e.stopPropagation();
    let display = 'none';
    if (e.target.nodeName === 'TD') {
      display = e.target.parentNode.nextSibling.style.display
    } else  if (e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.style !== undefined){
      display = e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display;
    }

    const hiddenRows = (document.querySelectorAll(".example-detail-row") as unknown) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < hiddenRows.length; i++) {
      hiddenRows.item(i).style.display = hiddenRows.item(i).style.display === 'table-row' ? 'none' : '';
    }
    if (display.length <= 0 || display === 'none') {
      display = 'table-row';
    } else {
      display = 'none';
    }
    if (e.target.nodeName === 'TD') {
      e.target.parentNode.nextSibling.style.display = display;
    } else {
      console.log(e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.nodeName)
      if (e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.nodeName == "TR")
        e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display = display;

    }
  }

  deleteVehiculo(id: number, nombre: string) {
    if(this.updatedVehiculo.vendido){
      Swal.fire({
        title : 'No se puede eliminar un vehiculo vendido',
        icon : 'error'
    })
    }else{
      Swal.fire({
        title: "¿Esta seguro que quiere eliminar el vehículo " + nombre + "?",
        text: "Sera eliminado permanentemente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Si, eliminalo",
        cancelButtonText: 'No, he cambiado de opinión'
      }).then((result) => {
        if (result.value) {
          this.vehiculosService.deleteVehiculo(id).subscribe(response => {
            if (response) {
              // this.toastr.success("El cliente se ha eliminado correctamente");
              Swal.fire({
                title: "El vehículo se ha eliminado correctamente",
                icon: 'success'
              })
              this.cargarVehiculos();
            }
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Operación cancelada',
            'No se ha eliminado el registro'
          )
        }
      })
  
    }
    
  }
  updateVehiculo(id: number) {
    this.updatedVehiculo = this.dsVehiculos.find(function (v) { return v.id == id })
    if(this.updatedVehiculo.vendido){
      Swal.fire({
        title : 'No se puede modificar un vehiculo vendido',
        icon : 'error'
    })
    }else{
      sessionStorage.setItem("formVehiculo", JSON.stringify(this.updatedVehiculo));
      this.clientesService.getById(this.updatedVehiculo.vendedor_id).subscribe(response => {
        console.log(response)
      })
      sessionStorage.setItem("isUpdateVehiculo", this.updatedVehiculo.id as unknown as string)
      this.router.navigateByUrl('vehiculos/registro').then(response => {if(response){
        // location.reload()
  
        // 
  
       }});
    }

  }

  addVehiculo() {
    // this.router.navigateByUrl('vehiculos/registro')
     this.router.navigate(['registro'], { relativeTo : this.route}).then(response => {if(response){ }});
    
  }

  deleteGasto(id: number, nombre: string, idVehiculo : number) {
    this.updatedVehiculo = this.dsVehiculos.find(function (v) { return v.id == idVehiculo })
    if(this.updatedVehiculo.vendido){
        Swal.fire({
          title : 'No se puede eliminar un gasto de un vehículo vendido',
          icon : 'error'
      })
    }else{
      Swal.fire({
        title: "¿Esta seguro que quiere eliminar el gasto " + nombre + "?",
        text: "Sera eliminado permanentemente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Si, eliminalo",
        cancelButtonText: 'No, he cambiado de opinión'
      }).then((result) => {
        if (result.value) {
          this.gastoVehiculoService.deleteGastoVehiculo(id).subscribe(response => {
            if (response) {
              // this.toastr.success("El cliente se ha eliminado correctamente");
              Swal.fire({
                title: "El gasto se ha eliminado correctamente",
                icon: 'success'
              })
              this.cargarVehiculos();
            }
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Operación cancelada',
            'No se ha eliminado el registro'
          )
        }
      })
    }
   
  }

  updateGasto(id: number, idVehiculo : number) {
    this.vehiculoGasto = this.dsVehiculos.find(function (v) { return v.id == idVehiculo })
    if(this.vehiculoGasto.vendido){
      Swal.fire({
        title : 'No se pueden modificar un gasto de un vehículo vendido',
        icon : 'error'
    })
    }else{
      var updatedGasto = this.vehiculoGasto.gastos.find(function (g) { return g.id == id })
      sessionStorage.setItem("vehiculoGasto", JSON.stringify(this.vehiculoGasto));
      sessionStorage.setItem("updatedGastoVehiculo", JSON.stringify(updatedGasto));
      this.router.navigateByUrl('vehiculos/gastovehiculo/registro')
    }

  }
  addGasto(idVehiculo : number) {
    this.vehiculoGasto = this.dsVehiculos.find(function (v) { return v.id == idVehiculo })
    if(this.vehiculoGasto.vendido){
      Swal.fire({
        title : 'No se pueden añadir gastos a un vehículo vendido',
        icon : 'error'
    })
    }else{
      sessionStorage.setItem("vehiculoGasto", JSON.stringify(this.vehiculoGasto));
      this.router.navigateByUrl('vehiculos/gastovehiculo/registro')
    }

  }

  sellVehiculo(idVehiculo : number){
    this.updatedVehiculo = this.dsVehiculos.find(function (v) { return v.id == idVehiculo })
    if(this.updatedVehiculo.vendido){
      Swal.fire({
        title : 'No se puede vender un vehiculo que ya esta vendido',
        icon : 'error'
    })
    }else{
      sessionStorage.setItem("formVehiculo", JSON.stringify(this.updatedVehiculo));
      this.clientesService.getById(this.updatedVehiculo.vendedor_id).subscribe(response => {
        console.log(response)
      })
      sessionStorage.setItem("isUpdateVehiculo", this.updatedVehiculo.id as unknown as string)
      this.router.navigateByUrl('vehiculos/registro')

      }
  }
}
