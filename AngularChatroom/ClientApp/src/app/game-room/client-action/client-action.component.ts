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
  clientBid: number;
  playCardsPhase = GamePhases.PLAYCARDS;
  playOrBidPhase = GamePhases.PLAYORBID;
  biddingPhase = GamePhases.BIDDING;
  challengePhase = GamePhases.CHALLENGE;

  constructor(private playerActionSerivce: PlayerActionService,
              private gameService: GameService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.client){
      this.client = changes.client.currentValue;
    }
  }

  endTurn() {
    this.gameService.endTurn();
  }

  playCard(card: Card) {
    this.playerActionSerivce.playCard(card, this.client);
    if(this.client.cardsPlayed > 1){
      this.endTurn();
    }
  }

  makeABid() {
    this.playerActionSerivce.makeABid(this.clientBid, this.client);
    this.endTurn()
  }

  passBid() {
    this.playerActionSerivce.passABid(this.client);
    this.endTurn()
  }

  startChallenge(){
    this.playerActionSerivce.successfulChallenge(this.client);
    this.gameService.sendEndOfRoundMessage();
  }

  removeACard() {

  }
}
