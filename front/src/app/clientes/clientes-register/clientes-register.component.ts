import { Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/Models/cliente.model';
import { ClientesService } from 'src/app/Services/clientes.service';

@Component({
  selector: 'app-clientes-register',
  templateUrl: './clientes-register.component.html',
  styleUrls: ['./clientes-register.component.css']
})
export class ClientesRegisterComponent implements OnInit {
  registroCliente: FormGroup;
  cliente : Cliente;

  constructor(private fb: FormBuilder, private clientesService : ClientesService, private router : Router,private toastr: ToastrService) { 
    this.registroCliente = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: '',
      telefono: ['', Validators.required],
      direccion: '',
      email : ['', Validators.email]

    });
  }

  ngOnInit(): void {
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
    this.clientesService.insertCliente(this.cliente).subscribe(response => {
      
      if(response){
        this.toastr.success('El cliente se ha introducido correctamente')
        // this.router.navigateByUrl('clientes')
      }
    });
  }

}
