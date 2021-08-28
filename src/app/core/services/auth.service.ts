import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  regUrl = 'http://localhost:8080/api/auth/register'
  loginUrl = 'http://localhost:8080/api/auth/login'

  constructor(private readonly http: HttpClient) { }

  login(user: any) {
    return this.http.post(this.loginUrl, user)
  }

  regUser(user: any) {
    return this.http.post(this.regUrl, user)
  }
}
