import { EventEmitter, Injectable } from '@angular/core';
import { Card, CardType } from './card';
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
    var playerDataObject = {
      id : player.id,
      bid : player.bid,
      hand: this.dummyCardArray(player.hand),
      stack: this.dummyCardArray(player.stack),
      hasPassedBidding : player.hasPassedBidding,
      winCount : player.winCount
    }
    this.connectionService.sendEvent("UpdatePlayerState", playerDataObject);
  }

  dummyCardArray(cards: Card[]){
    var nullArray: Card[] = [];
    cards.forEach(_ => {
      nullArray.push(new Card(CardType.NULL))
    });
    return nullArray
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
