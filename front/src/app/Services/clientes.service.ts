import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../Models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private path : string = 'cliente';
  baseUrl : string;

  constructor(private http : HttpClient) {
    this.baseUrl = environment.url_api;
   }

   getClientes() : Observable<any> {
    return this.http.get(this.baseUrl + this.path);
    
   }
}
