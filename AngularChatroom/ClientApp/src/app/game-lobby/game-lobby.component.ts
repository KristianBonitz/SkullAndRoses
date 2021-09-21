import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'
import { Player } from '../player';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})

export class GameLobbyComponent implements OnInit {
  public clientPlayer: Player;
  public newPlayer: Player;
  public isClientReady: boolean = false;
  public hasGameStarted: boolean = false;

  constructor(private playerService: PlayerService,
    private connectionService: ConnectionService) {
    this.subscribeToEvents();
    this.clientPlayer = new Player();
  }

  subscribeToEvents() {
    this.connectionService.playerReady.subscribe((player: Player) => {
      if (player.id !== this.clientPlayer.id) {
        this.newPlayer = player;
      }
    });

    this.connectionService.gameStarting.subscribe("StartingGame", () => {
      if (this.isClientReady) {
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
    this.connection.send("StartGame");
  }
}