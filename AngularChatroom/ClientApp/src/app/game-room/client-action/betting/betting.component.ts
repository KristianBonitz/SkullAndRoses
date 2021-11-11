import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/game.service';
import { Player } from 'src/app/player';
import { PlayerActionService } from 'src/app/player-action.service';

@Component({
  selector: 'betting-component',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.css']
})
export class BettingComponent implements OnInit {
  public clientBid: number;
  @Input() client: Player;
  @Input() highestBid: number;
  @Input() maxBid: number;
  @Input() canPass: boolean;
  viewBiddingActions: boolean = false;

  constructor(
    private playerActionSerivce: PlayerActionService,
    private gameService: GameService) { }

  ngOnInit() {
  }

  showBiddingActions(){
    this.viewBiddingActions = true;
    this.clientBid = this.defaultBettingValue;
  } 

  makeABid(bid: number) {
    this.playerActionSerivce.makeABid(bid, this.client);
    this.viewBiddingActions = false;
    this.endTurn()
  }

  passBid() {
    this.playerActionSerivce.passABid(this.client);
    this.endTurn()
  }

  endTurn() {
    this.gameService.endTurn(this.client);
  }

  get defaultBettingValue(){
    return this.highestBid < 1 ? 1 : this.highestBid;
  }

}
