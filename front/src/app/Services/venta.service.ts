import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from '../Models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private path : string = 'venta';
  baseUrl : string;

  constructor(private http : HttpClient) { 
    this.baseUrl = environment.url_api;
  }

  getVehiculos() : Observable<any> {
    return this.http.get(this.baseUrl + this.path);
    
   }

   insertVenta(venta : Venta) : Observable<any> {
    return this.http.post(this.baseUrl + this.path, venta);
   }

   updateVenta(venta : Venta) : Observable<any> {
    return this.http.put(this.baseUrl + this.path, venta)
   }

   deleteVenta(id : number) : Observable<any> {
    return this.http.delete(this.baseUrl + this.path + "/" + id)
   }

}
