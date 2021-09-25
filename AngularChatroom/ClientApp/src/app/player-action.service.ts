import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerActionService {
  public isGameStarting = new EventEmitter<Boolean>();

  constructor(private connectionService: ConnectionService) {
    this.subscribeToGameStart();
  }

  subscribeToGameStart() {
    this.connectionService.gameStarting.subscribe((isStarting: boolean) => {
      console.log("recive starting message")
      this.isGameStarting.emit(true);
    });
  }

  startGame() {
    console.log("sending start message")
    this.connectionService.sendEvent("StartGame", true);
  }

  endTurn() {

  }

  playCards() {

  }

  makeABid() {

  }

  passABid() {
    this.endTurn()
  }

  revealACard() {

  }

  removeACard() {

  }
}
