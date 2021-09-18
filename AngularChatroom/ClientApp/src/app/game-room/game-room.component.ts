import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service'
import * as SignalR from '@microsoft/signalr';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent implements OnInit, OnChanges {
  @Input() playerNames = [];
  @Input() isGameInProgress = false;
  public userName: string = "";
  public gamePlayers: Player[] = [];
  public connection: SignalR.HubConnection;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("/gameroomhub")
      .build();

    this.connection.start()
      .then(() => { console.log("Game Room Connection Started") })
      .catch(err => { console.error(err) })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.isGameInProgress)
    if (changes.isGameInProgress.currentValue === true) {
      this.createPlayers();
      this.startGame();
    }
  }

  createPlayers(): void {
    for (var i = 0; i < this.playerNames.length; i++) {
      this.gamePlayers.push(
        this.playerService.generatePlayer(this.playerNames[i])
      );
    }
    console.log(this.gamePlayers[0].value)
    console.log("players generated")
  }

  startGame() {
    console.log("game start")
  }
}