import { Component, OnInit } from '@angular/core';
import * as SignalR from '@microsoft/signalr';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {
  public userName: string = "";
  public readyPlayers: string[] = [];
  public connection: SignalR.HubConnection;

  ngOnInit() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("/gameroomhub")
      .build();

    this.connection.start()
      .then(() => { console.log("Game Room Connection Started") })
      .catch(err => { console.error(err) })
  }


  start() {
    //remove username and lobby components
    //load game components
  }
}