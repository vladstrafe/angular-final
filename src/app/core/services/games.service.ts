import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private readonly http: HttpClient) { }

  fetchGames() {
    return this.http.get('/api/games')
  }

  getLibrary() {
    return this.http.get('http://localhost:4200/api/library')
  }
}
