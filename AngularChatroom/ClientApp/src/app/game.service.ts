import { error } from '@angular/compiler/src/util';
import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameState = new EventEmitter<any>();
  public turnOrder: number[];

  constructor(private connectionService: ConnectionService) {
    this.subscribeToTurnEnded();
  }

  joinGame() {
    this.connectionService.recieveGameState.subscribe(gameData => {
      this.gameState.emit(gameData);
    });
  }

  shareGameData(gameData: any) {
    this.connectionService.sendEvent("SendGameState", gameData);
  }

  getTurnOrder() {
    return this.turnOrder;
  }

  endTurn() {
    this.connectionService.sendEvent("EndTurn", this.turnOrder[0]);
  }

  subscribeToTurnEnded() {
    this.connectionService.turnEnded.subscribe((playerId: number) => {
      if (playerId == this.turnOrder[0]) {
        console.log(this.turnOrder)
        this.cycleTurn();
        console.log(this.turnOrder)
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
