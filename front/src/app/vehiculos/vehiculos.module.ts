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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { DatePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
  declarations: [
    VehiculosMainComponent
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
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    DatePipe,
    BrowserModule,
    BrowserAnimationsModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'}
  ],
})
export class VehiculosModule { }
