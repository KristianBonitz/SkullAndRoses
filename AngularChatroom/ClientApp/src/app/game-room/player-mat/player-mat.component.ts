import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Player } from '../../player';

@Component({
  selector: 'player-mat',
  templateUrl: './player-mat.component.html',
  styleUrls: ['./player-mat.component.css']
})
export class PlayerMatComponent implements OnInit, OnChanges {
  @Input() player: Player;
  @Input() isPlayersTurn: boolean;

  constructor() { 
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.player){
      this.player = changes.player.currentValue;
    }
  }
}
