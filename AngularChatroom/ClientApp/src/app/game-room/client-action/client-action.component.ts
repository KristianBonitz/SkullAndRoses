import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../player';
import { PlayerActionService } from '../../player-action.service';

@Component({
  selector: 'client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.css']
})
export class ClientActionComponent implements OnInit {
  @Input() player: Player;

  constructor(private playerActionSerivce: PlayerActionService) {
  }

  ngOnInit() {
  }

  endTurn() {
    this.playerActionSerivce.endTurn();
  }

  playCards() {

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
