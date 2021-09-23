import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../player';
import { ConnectionService } from '../connection.service';
import { PlayerActionService } from '../player-action.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent implements OnChanges {
  @Input() client: Player;
  @Input() joiningPlayer: Player;
  @Input() isGameInProgress = false;
  public gamePlayers: Player[] = [];

  constructor(private playerActionService: PlayerActionService,
    private connectionService: ConnectionService,
    private playerService: PlayerService) {
    this.gamePlayers = playerService.gamePlayers;
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