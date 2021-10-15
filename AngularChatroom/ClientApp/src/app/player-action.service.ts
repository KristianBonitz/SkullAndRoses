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

  constructor(private connectionService: ConnectionService) {
  }

  playCard(card: Card, player: Player) {
    player.moveCardToStack(card);
    this.connectionService.sendEvent("UpdatePlayerState", player);
  }

  makeABid(bid: number, player: Player) {
    player.bid = bid;
    this.connectionService.sendEvent("UpdatePlayerState", player);
  }

  passABid(player: Player) {
    player.hasPassedBidding = true;
    this.connectionService.sendEvent("UpdatePlayerState", player);
  }

  revealACard() {

  }

  removeACard() {

  }
}
