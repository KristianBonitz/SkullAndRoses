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

  constructor(private playerActionSerivce: PlayerActionService,
              private gameService: GameService) {
  }

  ngOnInit() {
  }

  endTurn() {
    this.playerActionSerivce.endTurn();
  }

  playCard(card: Card) {
    this.playerActionSerivce.playCard(card, this.client);
    this.endTurn();
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
