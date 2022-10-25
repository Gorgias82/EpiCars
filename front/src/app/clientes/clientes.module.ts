import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesMainComponent } from './clientes-main/clientes-main.component';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClientesRegisterComponent } from './clientes-register/clientes-register.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { RouterModule } from '@angular/router';
//Flexlayout
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ClientesMainComponent,
    ClientesRegisterComponent,
    ClientesListComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule


  ]
})
export class ClientesModule { }
