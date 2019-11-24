import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";

import { AuthService } from "../login/login.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      "Content-Type": "application/json",
      token: `${this.auth.getToken()}`
    };

    request = request.clone({
      setHeaders: headers
    });
    return next.handle(request);
  }
}
