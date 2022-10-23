import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Vehiculo } from 'src/app/Models/vehiculo.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

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


@ViewChild(MatPaginator, { static: false }) paginator : MatPaginator;


  public cargado: boolean = false;
  dsVehiculos : Vehiculo[]
  dataSource : MatTableDataSource<Vehiculo>
  columnsToDisplay : string[] = ['matricula','marca','modelo','bastidor','kilometraje',
  'matriculacion','itv','precioCompra','precioVenta','fechaCompra','fechaVenta','gestionVenta','iconos']
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedElement: Vehiculo | null = null;
  columnsToDisplayGastos : string[] = ['descripcion','importe','fecha','metodoPago','iconos']

  constructor(private vehiculosService : VehiculoService) { }

  ngOnInit(): void {
    this.cargarVehiculos();
    if(this.dataSource !== undefined){
      this.dataSource.paginator = this.paginator;
    }
  }

  cargarVehiculos(){
    this.vehiculosService.getVehiculos().subscribe(response => {
      if(response){
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
    let display= 'none';
    if(e.target.nodeName === 'TD'){
      display = e.target.parentNode.nextSibling.style.display 
    }else{
      display = e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display;
    } 
 
    const hiddenRows  =  ( document.querySelectorAll(".example-detail-row") as unknown) as HTMLCollectionOf<HTMLElement>;
    for(let i = 0; i < hiddenRows.length; i++){
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
      if(e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.nodeName == "TR")
        e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display = display;
  
    }
  }

  deleteVehiculo(id : number) {
    throw new Error('Method not implemented.');
    }
    updateVehiculo(id : number) {
    throw new Error('Method not implemented.');
    }
    addVehiculo() {
    throw new Error('Method not implemented.');
    }

    deleteGasto(arg0: any) {
      throw new Error('Method not implemented.');
      }
      updateGasto(arg0: any) {
      throw new Error('Method not implemented.');
      }
      addGasto() {
      throw new Error('Method not implemented.');
      }
}
