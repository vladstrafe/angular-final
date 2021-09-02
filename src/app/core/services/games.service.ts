import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private readonly http: HttpClient) { }

  fetchGames() {
    return this.http.get('games')
  }

  getLibrary() {
    return this.http.get('library')
  }
}
