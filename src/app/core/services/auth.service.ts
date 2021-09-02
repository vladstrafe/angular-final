import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  regUrl = 'auth/register'
  loginUrl = 'auth/login'

  constructor(private readonly http: HttpClient) { }

  regUser(user: any) {
    return this.http.post(this.regUrl, user)
  }

  login(user: any) {
    return this.http.post(this.loginUrl, user)
  }

  getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  isLoggedIn() {
    const token = this.getCookie('user')

    if(token) return true
    
    return false
  }

}
