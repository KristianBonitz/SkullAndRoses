import { Component, Input, OnInit } from '@angular/core';
import { Card, CardData } from 'src/app/card';
import { GamePhases } from 'src/app/game-phases';
import { GameService } from 'src/app/game.service';
import { Player } from 'src/app/player';

@Component({
  selector: 'game-state-component',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.css']
})
export class GameStateComponent implements OnInit {
  @Input() gamePhase: GamePhases = GamePhases.BIDDING;
  @Input() client: Player;
  gamePhases = GamePhases;

  public highestBid: Player
  public activePlayer: string = ""
  public revealedCards: CardData[];
  public cardsToReveal: number;
  public lastCard: CardData;
  public isRevealedCardTheOwnersCard: boolean;
  public isOnePlayerLeft: boolean;

  constructor(private gameService: GameService) {
    this.subscribeToTurnEnds();
    this.subscribeToCardReveals();
    this.subscribeToRoundOver();
    this.subscribeToChallengeComplete();
    this.subscribeToGameComplete();
  }

  ngOnInit() {
    this.updateGameState();
  }

  subscribeToTurnEnds() {
    this.gameService.turnOver.subscribe(() => {
      this.updateGameState();
    })
  }

  subscribeToRoundOver() {
    this.gameService.roundOver.subscribe(() => {
      this.clearGameState();
    })
  }

  subscribeToChallengeComplete() {
    this.gameService.challengeComplete.subscribe(() => {
      this.updateGameState();
    })
  }

  subscribeToCardReveals() {
    this.gameService.cardRevealed.subscribe(_ => {
      this.revealedCards = this.gameService.getRevealedCards();
      this.cardsToReveal = this.gameService.getCardsToReveal();
      this.lastCard = this.revealedCards[this.revealedCards.length - 1];
      this.isRevealedCardTheOwnersCard = this.lastCard.ownerId == this.gameService.currentTurnPlayerId();
    });
  }

  subscribeToGameComplete() {
    this.gameService.gameComplete.subscribe(() => {
      this.updateGameState();
      this.isOnePlayerLeft = this.gameService.isOnePlayerLeft();
    })
  }

  updateGameState() {
    this.highestBid = this.gameService.getHighestBidPlayer();
    this.activePlayer = this.gameService.currentTurnPlayer().name;
    this.cardsToReveal = this.gameService.getCardsToReveal();
  }

  clearGameState() {
    this.highestBid = null;
    this.revealedCards = this.gameService.getRevealedCards();
  }

}
