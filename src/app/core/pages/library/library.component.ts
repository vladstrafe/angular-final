import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';

@Component({
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  games: Game[] = []
  
  constructor(private readonly gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getLibrary()
      .subscribe(res => {
        this.games = res as Game[]
      })
  }

}
