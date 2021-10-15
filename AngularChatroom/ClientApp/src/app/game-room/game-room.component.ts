import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Player } from '../player';
import { ConnectionService } from '../connection.service';
import { PlayerActionService } from '../player-action.service';
import { PlayerService } from '../player.service';
import { GameService } from '../game.service';
import { GamePhases } from '../game-phases';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent implements OnInit {
  @Input() client: Player;
  @Input() joiningPlayer: Player;
  @Input() isGameInProgress = false;
  gamePhase: GamePhases;
  public currentTurnPlayerId: number;
  get nonClientPlayers() {
    return this.playerService.getAllPlayers().filter(player => player.id !== this.client.id)
  }

  constructor(
    private playerService: PlayerService,
    private gameService: GameService ) {
      this.subscribeToTurnEnds();
  }

  ngOnInit() {
    this.gameService.createPlayerOrder(this.playerService.getAllPlayers());
    this.currentTurnPlayerId = this.getActivePlayerId();
    this.gamePhase = this.getGamePhase();
  }

  subscribeToTurnEnds() {
    this.gameService.turnOver.subscribe(() => {
      this.currentTurnPlayerId = this.getActivePlayerId();
      this.gamePhase = this.getGamePhase();
    })
  }

  getActivePlayerId() {
    return this.gameService.currentTurnPlayerId();
  }

  getGamePhase(){
    return this.gameService.phase;
  }
}