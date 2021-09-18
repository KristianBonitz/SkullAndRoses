import { Component, OnInit } from '@angular/core';
import * as SignalR from '@microsoft/signalr';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})

export class GameLobbyComponent implements OnInit {
  public userName: string = "";
  public hasGameStarted: boolean = false;
  public readyPlayers: string[] = [];
  public connection: SignalR.HubConnection;

  ngOnInit() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("/gamelobbyhub")
      .build();

    this.connection.on("RecieveReady", (user) => {
      console.log(user + " is ready");
      this.readyPlayers.push(user);
    });

    this.connection.start()
      .then(() => { console.log("Connection Started") })
      .catch(err => { console.error(err) })
  }

  playerReady() {
    console.log("Sending Ready State");
    this.connection.send("SendPlayerReady", this.userName);
  }

  start() {
    this.hasGameStarted = true;
    this.connection.stop(); 
  }
}