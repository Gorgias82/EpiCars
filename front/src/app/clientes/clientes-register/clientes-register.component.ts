import { Component, Input, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/Models/cliente.model';
import { ClientesService } from 'src/app/Services/clientes.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { ClientesListComponent } from '../clientes-list/clientes-list.component';

@Component({
  selector: 'app-clientes-register',
  templateUrl: './clientes-register.component.html',
  styleUrls: ['./clientes-register.component.css']
})
export class ClientesRegisterComponent implements OnInit {
  // @Input() lista : ClientesListComponent
  registroCliente: FormGroup;
  cliente : Cliente;
  updatedCliente : Cliente;
  isModificacion : boolean = false;
  titulo : string = "Crear nuevo cliente";
  boton : string = "add-submit";
  constructor(private fb: FormBuilder, private clientesService : ClientesService, private router : Router,private toastr: ToastrService) { 
    this.creaFormulario();
  }

  creaFormulario(){
    this.registroCliente = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]*")])],
      apellido1: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]*")])],
      apellido2: ['', Validators.pattern("[a-zA-Z]*")],
      telefono: ['',  Validators.compose([Validators.required, Validators.pattern("[+]?[0-9]{2}[ -]?[0-9]*")])],
      direccion: '',
      email : ['', Validators.email]
    });
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("updatedCliente"));
    if(sessionStorage.getItem("updatedCliente")){
      this.updatedCliente = JSON.parse(sessionStorage.getItem("updatedCliente"));
      this.isModificacion = true;
      this.titulo = "Modifica el cliente " + this.updatedCliente.nombre + " " + this.updatedCliente.apellido1;
      this.boton = "modify-submit";
      this.registroCliente = this.fb.group({
        dni: [this.updatedCliente.documento, Validators.required ],
        nombre: [this.updatedCliente.nombre, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]*")])] ,
        apellido1: [this.updatedCliente.apellido1, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]*")])],
        apellido2: [this.updatedCliente.apellido2, Validators.pattern("[a-zA-Z]*")],
        telefono: [this.updatedCliente.telefono, Validators.compose([Validators.required, Validators.pattern("[+]?[0-9]{2}[ ]?[-]?[0-9]*")]) ],
        direccion: this.updatedCliente.direccion,
        email : [this.updatedCliente.email, Validators.email] 
      });
      // sessionStorage.removeItem("updatedCliente")
    }
    
  }

  onSubmit(form: FormGroup){  
 
    this.cliente = {
      nombre : form.get('nombre')?.value as unknown as string,
      apellido1 : form.get('apellido1')?.value as unknown as string,
      apellido2 : form.get('apellido2')?.value as unknown as string,
      documento : form.get('dni')?.value as unknown as string,
      telefono : form.get('telefono')?.value as unknown as string,
      email : form.get('email')?.value as unknown as string,
      direccion : form.get('direccion')?.value as unknown as string,
    }
    this.cliente.nombre = this.cliente.nombre[0].toUpperCase() + this.cliente.nombre.substring(1).toLowerCase();
    this.cliente.apellido1 = this.cliente.apellido1[0].toUpperCase() + this.cliente.apellido1.substring(1).toLowerCase();
    if(this.cliente.apellido2.length > 0){
      this.cliente.apellido2 = this.cliente.apellido2[0].toUpperCase() + this.cliente.apellido2.substring(1).toLowerCase();
    }
    if(this.isModificacion){
      // aqui se llama al servicio de updating
      this.cliente.id = this.updatedCliente.id;
      this.clientesService.updateCliente(this.cliente).subscribe(response => {
        if(response){
          Swal.fire({
            title : 'El cliente se ha modificado correctamente',
            icon : 'success'
          })
          this.isModificacion = false;
          this.titulo = "Crear nuevo cliente";
          this.boton = "add-submit";
          sessionStorage.removeItem("updatedCliente")
          this.creaFormulario();
        }
      })
  
    }else{
      this.clientesService.insertCliente(this.cliente).subscribe(response => {      
        if(response){
          Swal.fire({
            title : 'El cliente se ha introducido correctamente',
            icon : 'success'
          })
          
          this.creaFormulario();
     
          // this.router.navigateByUrl('clientes')
        }
      });
    }

  }

  ngOnDestroy(){
    sessionStorage.removeItem("updatedCliente")
  }

}
