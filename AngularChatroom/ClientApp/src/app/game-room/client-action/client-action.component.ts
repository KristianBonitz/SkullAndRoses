import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Card } from 'src/app/card';
import { GameService } from '../../game.service';
import { Player } from '../../player';
import { PlayerActionService } from '../../player-action.service';
import { GamePhases } from 'src/app/game-phases';

@Component({
  selector: 'client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.css']
})
export class ClientActionComponent implements OnInit {
  @Input() client: Player;
  @Input() isClientTurn: boolean;
  @Input() gamePhase: GamePhases;
  @Input() highestBid: number;
  @Input() maxBid: number;
  
  playCardsPhase = GamePhases.PLAYCARDS;
  playOrBidPhase = GamePhases.PLAYORBID;
  biddingPhase = GamePhases.BIDDING;
  challengePhase = GamePhases.CHALLENGE;
  roundOverPhase = GamePhases.ROUNDCOMPLETE;
  removeCardPrompt = false;

  constructor(private playerActionSerivce: PlayerActionService,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.subscribeToRemoveCardPrompt();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.client){
      this.client = changes.client.currentValue;
    }
  }

  subscribeToRemoveCardPrompt(){
    this.gameService.removeCard.subscribe(_ => {
      this.removeCardPrompt = true;
      this.client.collectCards();
    });
  }

  endTurn() {
    this.gameService.endTurn(this.client);
  }

  playCard(card: Card) {
    this.playerActionSerivce.playCard(card, this.client);
    if(this.client.cardsPlayed > 1){
      this.endTurn();
    }
  }

  startNewRound(){
    this.gameService.sendEndOfRoundMessage();
  }

  revealCard() {
    this.playerActionSerivce.revealACard(this.client)
  }

  removeCard(card) {
    this.removeCardPrompt = false;
    var cardPos = this.client.hand.findIndex(c => c.value == card.value);
    this.playerActionSerivce.removeACard(this.client, cardPos)
  }
}
