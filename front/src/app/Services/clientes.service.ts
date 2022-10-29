import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../Models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private path : string = 'cliente';
  baseUrl : string;
  private currentClientSource = new ReplaySubject<Cliente>(1);
  currentClient$ : Observable<Cliente> = this.currentClientSource.asObservable();
  constructor(private http : HttpClient) {
    this.baseUrl = environment.url_api;
   }

   getClientes() : Observable<any> {
    return this.http.get(this.baseUrl + this.path);
    
   }

   getAll(pageIndex? : number, pageSize? : number): Observable<any> {
    var query = this.baseUrl + this.path + '/list';
    if(pageIndex !== undefined && pageSize !== undefined){
      query = query + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
      console.log(query);
    }

    return this.http.get(query);
   
  }

  getById(id : number){
    return this.http.get(this.baseUrl + this.path + '/findbyid?id=' +  id).pipe(
   map((response : Cliente) => {
     const client = response;
     if(client){
       this.setCurrentClient(client);
     }
     return client;
   })
 )
}
   insertCliente(cliente : Cliente) : Observable<any> {
    return this.http.post(this.baseUrl + this.path, cliente);
   }

   updateCliente(cliente : Cliente) : Observable<any> {
    return this.http.put(this.baseUrl + this.path, cliente);
   }

   deleteCliente(id : number) : Observable<any> {
    return this.http.delete(this.baseUrl + this.path + "/" + id)
   }

   setCurrentClient(client : Cliente){
    sessionStorage.setItem("cliente",JSON.stringify(client));
    this.currentClientSource.next(client);
  }

  logout(){
    sessionStorage.removeItem("cliente");
    this.currentClientSource.next(null);
  }
}
