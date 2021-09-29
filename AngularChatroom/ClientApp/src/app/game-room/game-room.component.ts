import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Player } from '../player';
import { ConnectionService } from '../connection.service';
import { PlayerActionService } from '../player-action.service';
import { PlayerService } from '../player.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent implements OnInit {
  @Input() client: Player;
  @Input() joiningPlayer: Player;
  @Input() isGameInProgress = false;
  public nonClientPlayers: Player[] = [];
  public currentTurnPlayerId: number;

  constructor(private playerActionService: PlayerActionService,
    private connectionService: ConnectionService,
    private playerService: PlayerService,
    private gameService: GameService  ) {
  }

  ngOnInit() {
    this.subscribeToTurnEnds();
    this.gameService.createPlayerOrder(this.playerService.gamePlayers);
    this.currentTurnPlayerId = this.getActivePlayerId();
    this.nonClientPlayers = this.getAllNonClientPlayers();
  }

  getAllNonClientPlayers() {
    return this.playerService.gamePlayers.filter(
    player => player.id !== this.client.id)
  }

  subscribeToTurnEnds() {
    this.gameService.turnOver.subscribe(() => {
      this.currentTurnPlayerId = this.getActivePlayerId();
    })
  }

  getActivePlayerId() {
    return this.gameService.currentTurnPlayerId();
  }
}