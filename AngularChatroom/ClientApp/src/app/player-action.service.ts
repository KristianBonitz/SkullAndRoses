import { EventEmitter, Injectable } from '@angular/core';
import { Card } from './card';
import { ConnectionService } from './connection.service';
import { GameService } from './game.service';
import { Player } from './player';

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

  playCard(card: Card, player: Player) {
    player.moveCardToStack(card);
    this.connectionService.sendEvent("UpdatePlayerState", player);
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
