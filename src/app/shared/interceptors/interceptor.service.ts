import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import SwAlert from 'sweetalert2';
import { LoaderService } from '../services/loader.service';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {
  constructor(private loaderSvc: LoaderService) {}

  private static getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401: {
        return `Forbidden: ${error.message}`;
      }
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderSvc.setLoading(true);
    const requestClone: HttpRequest<any> = req.clone();
    return next.handle(requestClone).pipe(
      tap(
        () => {},
        (err) => {
          SwAlert.fire({
            icon: 'error',
            title: ` Algo salió mal en la petición.`,
            footer: `
                <span style='color: red;'>
                    Error ${err.status}! <b> ${InterceptorService.getServerErrorMessage(err)}</b>
                </span>
                `
          }).then(() => {
            this.loaderSvc.setLoading(false);
          });
        },
        () => {
          this.loaderSvc.setLoading(false);
        }
      )
    );
  }
}
