import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'
import { Player } from '../player';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})

export class GameLobbyComponent{
  public clientPlayer: Player;
  public clientId: number;
  public newPlayer: Player;
  public isClientReady: boolean = false;
  public isGameHost: boolean = false;
  public hasGameStarted: boolean = false;
  public readyPlayers: Player[] = [];


  constructor(private playerService: PlayerService,
    private connectionService: ConnectionService)
  {
    this.subscribeToEvents();
    this.clientPlayer = new Player();
    this.clientId = this.clientPlayer.id;
  }

  subscribeToEvents() {
    this.connectionService.gameStarting.subscribe((isStarting: boolean) => {
      this.hasGameStarted = isStarting && this.isClientReady;
    });

    this.playerService.updatedPlayerList.subscribe(list => {
      this.readyPlayers = list
    });
  }

  start() {
    this.connectionService.sendEvent("StartGame", true);
  }

  clientPlayerReady() {
    this.playerService.requestAllReadyPlayers();
    this.playerService.addPlayerToGame(this.clientPlayer);
    this.isClientReady = true;
  }
}