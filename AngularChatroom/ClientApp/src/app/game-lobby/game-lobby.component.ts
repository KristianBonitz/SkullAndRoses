import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'
import { Player } from '../player';
import { ConnectionService } from '../connection.service';
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
  public hasGameStarted: boolean = false;
  public readyPlayers: Player[] = [];


  constructor(private playerService: PlayerService,
    private playerActionService: PlayerActionService,
    private connectionService: ConnectionService) {
    this.subscribeToEvents();
    this.clientPlayer = new Player();
    this.readyPlayers = this.playerService.gamePlayers;
  }

  subscribeToEvents() {

    this.connectionService.gameStarting.subscribe("StartingGame", () => {
      if (this.isClientReady && !this.hasGameStarted) {
        this.hasGameStarted = true;
        this.start();
      } else {
        // start a new room
      }
    });
  }

  clientPlayerReady() {
    console.log("Sending Ready State");
    this.playerService.addPlayerToGame(this.clientPlayer);
    this.isClientReady = true;
  }

  start() {
    this.hasGameStarted = true;
    this.playerActionService.startGame();
  }
}