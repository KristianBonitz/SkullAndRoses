import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../player';

@Component({
  selector: 'client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.css']
})
export class ClientActionComponent implements OnInit {
  @Input() player: Player;

  constructor() {
  }

  ngOnInit() {
  }

  endTurn() {

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
