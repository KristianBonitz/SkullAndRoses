import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { GamePhases, GamePhaseService } from './game-phases';
import { MessageService } from './message-handler.service';
import { Player } from './player';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public turnOver = new EventEmitter<boolean>();
  public roundOver = new EventEmitter<boolean>();
  public turnOrder: number[];
  public phase: GamePhases = GamePhases.PLAYCARDS;

  constructor(private connectionService: ConnectionService, 
    private messageService: MessageService,
    private gamePhaseService: GamePhaseService, 
    private playerService: PlayerService) {
    this.subscribeToTurnEnded();
    this.subscribeToRoundEnded();
  }

  currentTurnPlayerId() {
    return this.turnOrder[0];
  }

  currentTurnPlayerName() {
    return this.playerService.getPlayerById(this.currentTurnPlayerId()).name;
  }

  getHighestBidPlayer(){
    return this.playerService.getAllPlayers().slice().reduce((p1, p2) => p1.bid > p2.bid ? p1 : p2)
  }

  endTurn() {
    this.connectionService.sendEvent("EndTurn", this.turnOrder[0]);
  }

  sendEndOfRoundMessage(){
    this.connectionService.sendEvent("RoundOver", true);
  }

  endRound(){
    this.phase = this.gamePhaseService.resetGamePhase()
    this.playerService.resetPlayerRound();
    this.roundOver.emit(true);
  }

  subscribeToRoundEnded(){
    this.connectionService.endRound.subscribe(_ => {
      this.endRound();
    })
  }

  subscribeToTurnEnded() {
    this.connectionService.turnEnded.subscribe((playerId: number) => {
      if (playerId == this.turnOrder[0]) {
        this.setActivePlayer();
        this.checkAndUpdateGamePhase();
        this.turnOver.emit(true);
      } else {
        throw Error("Turns aren't matching internal sysetem");
      }
    });
  }

  checkAndUpdateGamePhase(){
    if (this.gamePhaseService.doesGamePhaseChange(
      this.phase, this.playerService.getSimplePlayerStates())){
        this.phase = this.gamePhaseService.updateGamePhase(this.phase);
      }
  }

  createPlayerOrder(playerList: Player[]) {
    var sortedIdList = playerList.sort((a, b) => a.id - b.id).map(a => a.id);
    this.turnOrder = sortedIdList;
  }

  setActivePlayer(){
    do{
      this.cycleTurn();
    }while(this.playerService.checkIfPlayerHadPassed(this.turnOrder[0]));
  }

  cycleTurn() {
    var currentTurn = this.turnOrder[0];
    this.turnOrder = this.turnOrder.slice(1);
    this.turnOrder.push(currentTurn);
  }
}
