import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente.model';
import { ClientesService } from 'src/app/Services/clientes.service';


@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator : MatPaginator;
  public searchTerm: string = '';
  clientes: Cliente[] = []
  allClientes : Cliente [] = []
  public cargado : boolean = false;
  dataSource : any;
  constructor(public ClientesService : ClientesService, public router : Router) { }

  ngOnInit(): void {
    this.onClickPaginator();
  }

  ngAfterViewInit() {

    
    this.ClientesService.getAll().subscribe(x => {
      this.clientes = x; 
      for(let cliente of this.clientes){
        cliente.documento = cliente.documento === null ? '': cliente.documento;
      }
      this.clientes.forEach(c => {
        c.nombre = this.quitarTildes(c.nombre);
      })

      this.allClientes = this.clientes; 
      this.cargado = true; 
      this.onClickPaginator();
    })
  }
 
  search(value: string): void {
        if(value === undefined || value.length <= 0){
          this.clientes = this.allClientes
          this.onClickPaginator();
      
        }else{
          this.clientes = this.allClientes.filter((val) =>
          val.apellido1.toLowerCase().includes(value.toLowerCase())
        );
        }
        
        
        
  }
  onClickPaginator(){
    var pageIndex = 0;
    var pageSize = 5;
    if(this.paginator !== undefined){
      pageIndex = this.paginator.pageIndex;
      pageSize = this.paginator.pageSize
    }
    this.ClientesService.getAll(pageIndex,pageSize).subscribe(x => {
      this.clientes = x; 
      for(let cliente of this.clientes){
        cliente.documento = cliente.documento === null ? '': cliente.documento;
      }
      this.clientes.forEach(c => {
        c.nombre = this.quitarTildes(c.nombre);
      })
      this.cargado = true; 
    })
  }
  //iniciar sesión
  onClickCliente(id){
    console.log(id)
    this.ClientesService.getById(id).subscribe(response => {
   
  
    });
    if(sessionStorage.getItem('formVehiculo')){
      console.log("prueba vehiculos registro")
      this.router.navigateByUrl('vehiculos/registro')
    }else if (sessionStorage.getItem('formVenta')){
      this.router.navigateByUrl('ventas/registro')
    }
  }

  cerrarSesion(){
    this.ClientesService.logout();
    if(sessionStorage.getItem('formVehiculo')){
      console.log("prueba vehiculos registro")
      this.router.navigateByUrl('vehiculos/registro')
    }else if (sessionStorage.getItem('formVenta')){
      this.router.navigateByUrl('ventas/registro')
    }
  }

  volver(){
    if(sessionStorage.getItem('formVehiculo')){
      console.log("prueba vehiculos registro")
      this.router.navigateByUrl('vehiculos/registro')
    }else if (sessionStorage.getItem('formVenta')){
      this.router.navigateByUrl('ventas/registro')
    }
  }

  quitarTildes(texto : string){
    return  texto.normalize('NFD')
    .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
    .normalize();
  }

}
