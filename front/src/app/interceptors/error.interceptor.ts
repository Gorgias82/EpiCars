import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';  


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        
        if(error.status == 400 && error.error.mensaje){
            Swal.fire({
              title : error.error.mensaje,
              text :  error.status,
              icon : 'error'
            })
        }else{
          Swal.fire({
            title : error.statusText,
            text :  error.status,
            icon : 'error'
          })
        }
        return throwError(() => 'err')
      })
    );
  }
}
