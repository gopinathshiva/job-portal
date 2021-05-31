import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, finalize, map} from 'rxjs/operators';
import {LoaderService} from './loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private snackBar: MatSnackBar) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest)
      .pipe(
        delay(2000), // added delay to emulate http api calls
        finalize(() => this.loaderService.setLoading(false)),
        map((response: HttpResponse<any>) => {
          if (response?.body?.message) {
            this.snackBar.open(response.body.message, 'close', {
              duration: 3000,
            });
          }
          return response;
        }),
        catchError(err => {
          this.snackBar.open(err.error.message, 'close', {
            duration: 3000,
          });
          return throwError(err);
        }
      ));
  }
}
