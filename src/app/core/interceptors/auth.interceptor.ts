import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private readonly router: Router) { }
  
  getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.getCookie('user')

    if (token) {
      const cloned = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      return next.handle(cloned);  
    }
    else {
      this.router.navigate(['../auth'])
      return next.handle(request)
    }
  }
}
