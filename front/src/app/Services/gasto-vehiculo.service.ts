import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GastoVehiculo } from '../Models/gasto-vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class GastoVehiculoService {
  private path : string = 'gastoVehiculo';
  baseUrl : string;
  constructor(private http : HttpClient) {
    this.baseUrl = environment.url_api;
   }

   insertGastoVehiculo(gastoVehiculo : GastoVehiculo) : Observable<any> {
    return this.http.post(this.baseUrl + this.path, gastoVehiculo);
   }

   updateGastoVehiculo(gastoVehiculo : GastoVehiculo) : Observable<any> {
    return this.http.put(this.baseUrl + this.path, gastoVehiculo);
   }

   deleteGastoVehiculo(id : number) : Observable<any> {
    return this.http.delete(this.baseUrl + this.path + "/" + id)
   }
}
