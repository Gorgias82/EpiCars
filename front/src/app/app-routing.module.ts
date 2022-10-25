import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClientesMainComponent } from './clientes/clientes-main/clientes-main.component';
import { ClientesRegisterComponent } from './clientes/clientes-register/clientes-register.component';
import { VehiculosMainComponent } from './vehiculos/vehiculos-main/vehiculos-main.component';
import { VehiculosRegisterComponent } from './vehiculos/vehiculos-register/vehiculos-register.component';

const routes: Routes = [
  { path : 'clientes', component:ClientesMainComponent},
  { path : 'clientes/registro', component:ClientesRegisterComponent},
  { path : 'clientes/list', component:ClientesListComponent},
  { path : 'vehiculos', component:VehiculosMainComponent},
  { path : 'vehiculos/registro', component:VehiculosRegisterComponent}, 
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
