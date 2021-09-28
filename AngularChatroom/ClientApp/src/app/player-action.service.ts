import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerActionService {
  public isGameStarting = new EventEmitter<Boolean>();

  constructor(private connectionService: ConnectionService,
              private gameService: GameService) {
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
    this.gameService.endTurn();
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
