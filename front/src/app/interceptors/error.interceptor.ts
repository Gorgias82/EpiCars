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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        
        if(error.status == 400 && error.error.mensaje){
          console.log(error.error.mensaje)
            this.toastr.error(error.error.mensaje,error.status)
        }else{
          this.toastr.error(error.statusText, error.status)
        }
        return throwError(() => 'err')
      })
    );
  }
}
