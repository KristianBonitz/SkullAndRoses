import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'
import { Player } from '../player';
import * as SignalR from '@microsoft/signalr';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})

export class GameLobbyComponent implements OnInit {
  public userName: string = "Bill";
  public clientPlayer: Player;
  public newPlayer: Player;
  public isClientReady: boolean = false;
  public hasGameStarted: boolean = false;
  public connection: SignalR.HubConnection;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("/gamelobbyhub")
      .build();

    this.connection.on("RecieveReady", (player) => {
      console.log("Recieved Ready State");
      if (!this.isClientReady || player.id !== this.clientPlayer.id) {
        this.newPlayer = player;
      } 
      console.log(this.readyPlayers)
      console.log(this.clientPlayer)
    });

    this.connection.start()
      .then(() => { console.log("Connection Started") })
      .catch(err => { console.error(err) })
  }

  playerReady() {
    console.log("Sending Ready State");
    var playerObj = this.playerService.generatePlayer(this.userName)
    this.isClientReady = true;
    this.clientPlayer = playerObj;
    this.connection.send("SendPlayerReady", playerObj);
    // TODO if client player isn't recieved back, retry request.
  }

  start() {
    this.hasGameStarted = true;
    this.connection.stop(); 
  }
}