import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private path : string = 'vehiculo';
  baseUrl : string;

  constructor(private http : HttpClient) { 
    this.baseUrl = environment.url_api;
  }

  getVehiculos() : Observable<any> {
    return this.http.get(this.baseUrl + this.path);
    
   }
}
