import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/card';
import { GameService } from '../../game.service';
import { Player } from '../../player';
import { PlayerActionService } from '../../player-action.service';

@Component({
  selector: 'client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.css']
})
export class ClientActionComponent implements OnInit {
  @Input() client: Player;
  @Input() isClientTurn: boolean;
  clientBid: number;

  constructor(private playerActionSerivce: PlayerActionService,
              private gameService: GameService) {
  }

  ngOnInit() {
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
    console.log("Making Bid")
    this.playerActionSerivce.makeABid(this.clientBid, this.client);
    this.endTurn()
  }

  passABid() {
    this.playerActionSerivce.passABid(this.client);
    this.endTurn()
  }

  revealACard() {

  }

  removeACard() {

  }
}
