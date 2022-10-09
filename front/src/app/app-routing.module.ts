import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesMainComponent } from './clientes/clientes-main/clientes-main.component';
import { ClientesRegisterComponent } from './clientes/clientes-register/clientes-register.component';

const routes: Routes = [
  { path : 'clientes', component:ClientesMainComponent},
  { path : 'clientes/registro', component:ClientesRegisterComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
