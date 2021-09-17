import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';
import * as SignalR from '@microsoft/signalr';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent implements OnInit {
  @Input() playerNames = [];
  @Input() isGameInProgress = false;
  public userName: string = "";
  public user: PlayerState;
  public players: PlayerState[] = [];
  public connection: SignalR.HubConnection;

  ngOnInit() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("/gameroomhub")
      .build();

    this.connection.start()
      .then(() => { console.log("Game Room Connection Started") })
      .catch(err => { console.error(err) })

  }
}