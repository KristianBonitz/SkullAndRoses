import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'
import { Player } from '../player';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})

export class GameLobbyComponent implements OnInit {
  @Input() clientName: string;
  @Input() roomId: string;

  private isInGame: boolean = false;
  public clientPlayer: Player;
  public clientId: number;
  public isClientReady: boolean = true;
  public hasGameStarted: boolean = false;
  public readyPlayers: Player[] = [];


  constructor(private playerService: PlayerService,
    private connectionService: ConnectionService) {
    this.subscribeToEvents();
  }

  ngOnInit() {
    this.connectionService.setRoom(this.roomId);
    this.clientPlayer = new Player();
    this.clientId = this.clientPlayer.id;
    this.clientPlayer.name = this.clientName;
  }

  subscribeToEvents() {
    this.connectionService.joinedRoom.subscribe(_ => {
      this.clientPlayerReady();
    });

    this.connectionService.gameStarting.subscribe((isStarting: boolean) => {
      this.hasGameStarted = isStarting && this.isClientReady;
    });

    this.playerService.updatedPlayerList.subscribe(list => {
      this.readyPlayers = list
    });
  }

  start() {
    this.connectionService.sendEvent("StartGame", true);
    this.playerService.updatedPlayerList.unsubscribe();
  }

  clientPlayerReady() {
    this.playerService.requestAllReadyPlayers();
    this.playerService.addClientToGame(this.clientPlayer);
    this.isClientReady = true;
  }
}