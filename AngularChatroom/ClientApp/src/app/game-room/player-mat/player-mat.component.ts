import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GameService } from '../../game.service';
import { Player } from '../../player';


@Component({
  selector: 'player-mat',
  templateUrl: './player-mat.component.html',
  styleUrls: ['./player-mat.component.css']
})
export class PlayerMatComponent implements OnInit {
  @Input() player: Player;
  @Input() isPlayersTurn: boolean;

  constructor(private gameService:GameService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
