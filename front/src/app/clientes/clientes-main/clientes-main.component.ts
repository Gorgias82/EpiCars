import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/Models/cliente.model';
import { ClientesService } from 'src/app/Services/clientes.service';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-clientes-main',
  templateUrl: './clientes-main.component.html',
  styleUrls: ['./clientes-main.component.css']
})
export class ClientesMainComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  clientes : Cliente[]
  displayedColumns : string[] = ['documento', 'telefono', 'nombre' ,'apellido1','apellido2','direccion','email', 'iconos']
  dataSource : MatTableDataSource<Cliente>
  dsClientes : Cliente[]
  constructor(private clientesService : ClientesService) { }

  ngOnInit(): void {

    console.log(this.dataSource)
    this.cargarClientes()



  }

  cargarClientes(){
    this.clientesService.getClientes().subscribe(response => {
      console.log(response)
      if(response){
        this.dsClientes = response;
        this.dataSource = new MatTableDataSource<Cliente>(this.dsClientes)
        this.dataSource.paginator = this.paginator
      }


    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
