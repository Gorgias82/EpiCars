import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Vehiculo } from 'src/app/Models/vehiculo.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/Services/clientes.service';
import Swal from 'sweetalert2';
import { GastoVehiculoService } from 'src/app/Services/gasto-vehiculo.service';

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
    'matriculacion', 'itv', 'precioCompra', 'precioVenta', 'fechaCompra', 'fechaVenta', 'gestionVenta', 'iconos']
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedElement: Vehiculo | null = null;
  columnsToDisplayGastos: string[] = ['descripcion', 'importe', 'fecha', 'metodoPago', 'iconos']
  updatedVehiculo: Vehiculo
  constructor(private vehiculosService: VehiculoService, private router: Router, private clientesService: ClientesService, private gastoVehiculoService: GastoVehiculoService) { }

  ngOnInit(): void {
    this.cargarVehiculos();
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
    }
  }

  cargarVehiculos() {
    this.vehiculosService.getVehiculos().subscribe(response => {
      if (response) {
        console.log(response);
        this.dsVehiculos = response;
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
    Swal.fire({
      title: "¿Esta seguro que quiere eliminar el vehículo " + nombre + "?",
      text: "Sera eliminado permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: 'No, he cambiado de opinión'
    }).then((result) => {
      if (result.value) {
        console.log(id)
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
  updateVehiculo(id: number) {
    this.updatedVehiculo = this.dsVehiculos.find(function (v) { return v.id == id })
    sessionStorage.setItem("formVehiculo", JSON.stringify(this.updatedVehiculo));
    this.clientesService.getById(this.updatedVehiculo.vendedor_id).subscribe(response => {
      console.log(response)
    })
    sessionStorage.setItem("isUpdateVehiculo", this.updatedVehiculo.id as unknown as string)
    this.router.navigateByUrl('vehiculos/registro')
  }

  addVehiculo() {
    this.router.navigateByUrl('vehiculos/registro')
  }

  deleteGasto(id: number, nombre: string) {
    Swal.fire({
      title: "¿Esta seguro que quiere eliminar el gasto " + nombre + "?",
      text: "Sera eliminado permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: 'No, he cambiado de opinión'
    }).then((result) => {
      if (result.value) {
        console.log(id)
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

  updateGasto(id: number) {
    this.router.navigateByUrl('vehiculos/gastovehiculo/registro')
  }
  addGasto() {
    this.router.navigateByUrl('vehiculos/gastovehiculo/registro')
  }
}
