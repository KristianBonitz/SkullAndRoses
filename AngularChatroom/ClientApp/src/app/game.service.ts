import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { GamePhases, GamePhaseService } from './game-phases';
import { MessageService } from './message-handler.service';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public turnOver = new EventEmitter<boolean>();
  public turnOrder: number[];
  public phase: GamePhases = GamePhases.PLAYCARDS;

  constructor(private connectionService: ConnectionService, 
    private messageService: MessageService,
    private gamePhaseService: GamePhaseService) {
    this.subscribeToTurnEnded();
  }

  currentTurnPlayerId() {
    return this.turnOrder[0];
  }

  endTurn() {
    this.connectionService.sendEvent("EndTurn", this.turnOrder[0]);
  }

  subscribeToTurnEnded() {
    this.connectionService.turnEnded.subscribe((playerId: number) => {
      if (playerId == this.turnOrder[0]) {
        this.cycleTurn();
        this.turnOver.emit(true);
      } else {
        throw Error("Turns aren't matching internal sysetem");
      }
    });
  }

  createPlayerOrder(playerList: Player[]) {
    var sortedIdList = playerList.sort((a, b) => a.id - b.id).map(a => a.id);
    console.log(sortedIdList);
    this.turnOrder = sortedIdList;
  }

  cycleTurn() {
    var currentTurn = this.turnOrder[0];
    this.turnOrder = this.turnOrder.slice(1);
    this.turnOrder.push(currentTurn);
  }

}
