import { Component, Input, OnInit } from '@angular/core';
import { CardData } from 'src/app/card';
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
  playCardsPhase = GamePhases.PLAYCARDS;
  playOrBidPhase = GamePhases.PLAYORBID;
  biddingPhase = GamePhases.BIDDING;
  challengePhase = GamePhases.CHALLENGE;
  
  public highestBid: Player
  public activePlayer: string = ""
  public revealedCards: CardData[];
  public cardsToReveal: number;

  constructor(private gameService: GameService) { 
    this.subscribeToTurnEnds();
    this.subscribeToCardReveals();
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

  subscribeToCardReveals(){
    this.gameService.cardRevealed.subscribe(_ => {
      this.revealedCards = this.gameService.getRevealedCards();
      this.cardsToReveal = this.gameService.getCardsToReveal();
    });
  }

  updateGameState(){
      this.highestBid = this.gameService.getHighestBidPlayer();
      this.activePlayer = this.gameService.currentTurnPlayerName();
      this.cardsToReveal = this.gameService.getCardsToReveal();
  }

  clearGameState(){
    this.highestBid = null;
    this.activePlayer = ""
    this.revealedCards = this.gameService.getRevealedCards();
  }

}
