import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { finalize, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ToastrOptions } from '../app.component';
import { SpinnerService } from '../services/spiner.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client error: ${error.error.message}`;
        } else {
          errorMessage = `Server error: ${error.status} - ${error.error.message}`;
        }

        this.toastr.error(errorMessage, '', ToastrOptions);
        // why no redirect to not-found page, user see broken detail page instead
        return throwError(errorMessage);
      }),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}
