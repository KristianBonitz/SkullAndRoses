import { Component, Input, OnInit } from '@angular/core';
import { GamePhases } from 'src/app/game-phases';

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
  
  public highestBid = {bid: 55, name: "Carlos"}
  public activePlayer: string = "Barry"

  constructor() { }

  ngOnInit() {
  }

}
