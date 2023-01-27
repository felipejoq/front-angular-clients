import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {IsAuthorizedHelper} from "../../../helpers/is-authorized.helper";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private readonly isNotAuth: IsAuthorizedHelper) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        this.isNotAuth.isAuth(err);
        return throwError(() => err);
      })
    );
  }
}
