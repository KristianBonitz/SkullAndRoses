import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameState = new EventEmitter<any>();

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


}
