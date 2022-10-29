import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { environment } from 'src/environments/environment';
import { Vehiculo } from '../Models/vehiculo.model';

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

   insertVehiculo(vehiculo : Vehiculo) : Observable<any> {
    return this.http.post(this.baseUrl + this.path, vehiculo);
   }

   updateVehiculo(vehiculo : Vehiculo) : Observable<any> {
    return this.http.put(this.baseUrl + this.path, vehiculo)
   }

   deleteVehiculo(id : number) : Observable<any> {
    return this.http.delete(this.baseUrl + this.path + "/" + id)
   }
}
