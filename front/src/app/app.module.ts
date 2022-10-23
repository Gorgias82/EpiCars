//Genericos
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Componentes propios
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';

//Modules propios
import { AppRoutingModule } from './app-routing.module';
import { ClientesModule } from './clientes/clientes.module';

//Flexlayout
import { FlexLayoutModule } from '@angular/flex-layout';

//Toastr
import { ToastrModule } from 'ngx-toastr';

// Materials
import {MatMenuModule} from '@angular/material/menu'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';  
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { VehiculosModule } from './vehiculos/vehiculos.module';

registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent


  ],
  imports: [
    ClientesModule,
    VehiculosModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right'
    })

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
