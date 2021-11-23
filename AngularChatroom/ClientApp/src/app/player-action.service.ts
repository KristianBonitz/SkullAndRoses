import { EventEmitter, Injectable } from '@angular/core';
import { Card, CardType, CardData } from './card';
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

  sendPlayerUpdate(player: Player) {
    this.connectionService.sendEvent("UpdatePlayerState", player.cleanPlayerData);
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

  successfulChallenge(player: Player) {
    player.winCount += 1;
    this.sendPlayerUpdate(player);
  }

  sendRevealedCard(playerId: number, card: Card) {
    var cardData: CardData = { ownerId: playerId, card: card }
    this.connectionService.sendEvent("RevealCard", cardData)
  }

  revealACard(player: Player) {
    this.sendRevealedCard(player.id, player.revealTopCardOfStack());
    this.sendPlayerUpdate(player);
  }

  removeACard(player: Player, cardPos?: number) {
    if (cardPos != null) {
      player.removeCard(cardPos);
    } else {
      player.removeCard();
    }
    this.sendPlayerUpdate(player);
  }
}
