import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getCookie('user')

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
