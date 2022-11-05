import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private path : string = 'metodoPago';
  baseUrl : string;
  constructor(private http : HttpClient) {
    this.baseUrl = environment.url_api;
   }

   getMetodosPago() : Observable<any> {
    return this.http.get(this.baseUrl + this.path);
    
   }
}
