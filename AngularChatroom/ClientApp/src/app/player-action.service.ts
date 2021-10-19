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

  sendPlayerUpdate(player: Player){
    this.connectionService.sendEvent("UpdatePlayerState", player);
  }

  playCard(card: Card, player: Player) {
    player.moveCardToStack(card);
    this.sendPlayerUpdate(player);
  }

  makeABid(bid: number, player: Player) {
    player.bid = bid;
    this.sendPlayerUpdate(player);
  }

  passABid(player: Player) {
    player.hasPassedBidding = true;
    this.sendPlayerUpdate(player);
  }

  successfulChallenge(player: Player){
    player.winCount += 1;
    this.sendPlayerUpdate(player);
  }

  revealACard() {

  }

  removeACard() {

  }
}
