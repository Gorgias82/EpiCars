import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehiculosMainComponent } from './vehiculos-main/vehiculos-main.component';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { DatePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { VehiculosRegisterComponent } from './vehiculos-register/vehiculos-register.component';


//Flexlayout
import { FlexLayoutModule } from '@angular/flex-layout';
import { GastoVehiculoRegisterComponent } from './gasto-vehiculo-register/gasto-vehiculo-register.component';

registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
  declarations: [
    VehiculosMainComponent,
    VehiculosRegisterComponent,
    GastoVehiculoRegisterComponent
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    DatePipe,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'}
  ],
})
export class VehiculosModule { }
