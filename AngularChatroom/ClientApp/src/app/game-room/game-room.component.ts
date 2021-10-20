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
  @Input() clientId: number;
  @Input() isGameInProgress = false;
  gamePhase: GamePhases;
  public currentTurnPlayerId: number;
  nonClientPlayers: Player[];
  client: Player;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService) {
      this.subscribeToTurnEnds();
      this.subscribeToRoundEnds();
  }

  ngOnInit() {
    this.gameService.createPlayerOrder(this.playerService.getAllPlayers());
    this.currentTurnPlayerId = this.getActivePlayerId();
    this.gamePhase = this.getGamePhase();
    this.nonClientPlayers = this.playerService.getAllPlayers().filter(player => player.id !== this.clientId);
    this.client = this.playerService.getAllPlayers().find(p => p.id == this.clientId);
    this.startGame();
  }

  startGame(){
    this.playerService.resetPlayerRound();
  }

  subscribeToTurnEnds() {
    this.gameService.turnOver.subscribe(() => {
      this.currentTurnPlayerId = this.getActivePlayerId();
      this.gamePhase = this.getGamePhase();
      this.nonClientPlayers = this.playerService.getAllPlayers().filter(player => player.id !== this.clientId);
    })
  }

  subscribeToRoundEnds(){
    this.gameService.roundOver.subscribe(() => {
      this.gamePhase = this.getGamePhase();
    });
  }

  getActivePlayerId() {
    return this.gameService.currentTurnPlayerId();
  }

  getGamePhase(){
    return this.gameService.phase;
  }
}