import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service'

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent implements OnInit, OnChanges {
  @Input() client: Player;
  @Input() joiningPlayer: Player;
  @Input() isGameInProgress = false;
  public gamePlayers: Player[] = [];
  //public connection: SignalR.HubConnection;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes.joiningPlayer && this.joiningPlayer) {
      this.gamePlayers.push(this.joiningPlayer);
    }
    if (changes.isGameInProgress && changes.isGameInProgress.currentValue === true) {
      this.createPlayers();
      this.startGame();
    }
  }

  createPlayers(): void {
    console.log(this.client)
    console.log(this.gamePlayers)
    console.log("players generated")
  }

  startGame() {
    console.log("game start")
  }
}