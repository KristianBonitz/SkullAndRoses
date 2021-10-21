import { Component, Input, OnInit } from '@angular/core';
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
  public activePlayer: string = "Barry"

  constructor(private gameService: GameService) { 
    this.subscribeToTurnEnds();
  }

  ngOnInit() {
    this.updateGameState();
  }

  subscribeToTurnEnds() {
    this.gameService.turnOver.subscribe(() => {
      this.updateGameState();
    })
  }

  updateGameState(){
      this.highestBid = this.gameService.getHighestBidPlayer();
      this.activePlayer = this.gameService.currentTurnPlayerName();
  }

}
