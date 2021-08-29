import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  getCurrentUser() {
    return this.http.get('/api/users/profile')
  }
  
  updateCurrentUser(user: User) {
    return this.http.patch('/api/users/profile', user)
  }

  getUser(email: string) {
    return this.http.post('/api/users', email)
  }

  getOwnedGames() {
    return this.http.get('/api/library')
  }

}
