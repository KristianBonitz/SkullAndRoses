import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameState = new EventEmitter<any>();
  public turnOrder: number[];

  constructor(private connectionService: ConnectionService) { }

  joinGame() {
    this.connectionService.recieveGameState.subscribe(gameData => {
      this.gameState.emit(gameData);
    });
  }

  shareGameData(gameData: any) {
    this.connectionService.sendEvent("SendGameState", gameData);
  }

  createRoom() {

  }

  createPlayerOrder(playerList: Player[]) {
    var sortedIdList = playerList.sort((a, b) => a.id - b.id).map(a => a.id);
    console.log(sortedIdList);
    return sortedIdList;
  }


}
