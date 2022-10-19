import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/Models/cliente.model';
import { ClientesService } from 'src/app/Services/clientes.service';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

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
  constructor(private clientesService : ClientesService, private router : Router, private toastr: ToastrService) { }

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
   this.updatedCliente = this.dsClientes.find(function(c)  {return c.id == id})
   localStorage.setItem("updatedCliente", JSON.stringify(this.updatedCliente));
   this.router.navigateByUrl('clientes/registro')
   
  }

  deleteCliente(id : number, nombre : string){
    Swal.fire({
      title: "¿Esta seguro que quiere eliminar el cliente " + nombre + "?",
      text: "Sera eliminado permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: 'No, he cambiado de opinión'
    }).then((result) => {
      if(result.value){
        this.clientesService.deleteCliente(id).subscribe(response => {
          if(response){
            this.toastr.success("El cliente se ha eliminado correctamente");
            this.cargarClientes();
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
