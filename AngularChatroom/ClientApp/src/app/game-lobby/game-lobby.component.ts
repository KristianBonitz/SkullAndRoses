import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'
import { Player } from '../player';
import { PlayerActionService } from '../player-action.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})

export class GameLobbyComponent{
  public clientPlayer: Player;
  public newPlayer: Player;
  public isClientReady: boolean = false;
  public isGameHost: boolean = false;
  public hasGameStarted: boolean = false;
  public readyPlayers: Player[] = [];


  constructor(private playerService: PlayerService,
    private playerActionService: PlayerActionService)
  {
    this.subscribeToEvents();
    this.clientPlayer = new Player();
  }

  subscribeToEvents() {
    this.playerActionService.isGameStarting.subscribe(start => {
      this.hasGameStarted = start && this.isClientReady;
      // if doesn't happen, player joins a new room.
    });

    this.playerService.updatedPlayerList.subscribe(list => {
      this.readyPlayers = list
    });
  }

  clientPlayerReady() {
    this.playerService.addPlayerToGame(this.clientPlayer);
    this.isClientReady = true;
  }

  start() {
    this.playerActionService.startGame();
  }
}