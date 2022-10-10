import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/Models/cliente.model';
import { ClientesService } from 'src/app/Services/clientes.service';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';


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
  updatedCliente : Cliente
  constructor(private clientesService : ClientesService, private router : Router) { }

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

  addCliente(){
    this.router.navigateByUrl('clientes/registro');
  }

  updateCliente(id : number){
   console.log(id)
   this.updatedCliente = this.dsClientes.find(function(c)  {return c.id == id})
   console.log(this.updatedCliente)
  }


}
