import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public games: Game[] = [];
  public foundGames: Game[] = [];

  constructor(private readonly gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.fetchGames()
      .subscribe(res => {
        this.games = res as Game[]
        this.foundGames = [...this.games]
    })
  }

  searchField = new FormControl(null)

  onSubmit(searchReq: any) {
    if(!searchReq.value) this.foundGames = [...this.games]
    const searchResult = []
    for (let game of this.foundGames) {
      if(game.name.toLowerCase().match(searchReq.value.toLowerCase())) searchResult.push(game)
    }
    this.foundGames = searchResult
  }
}
