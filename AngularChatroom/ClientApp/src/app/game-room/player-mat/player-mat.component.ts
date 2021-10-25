import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ConnectionService } from 'src/app/connection.service';
import { Player } from '../../player';

@Component({
  selector: 'player-mat',
  templateUrl: './player-mat.component.html',
  styleUrls: ['./player-mat.component.css']
})
export class PlayerMatComponent implements OnInit, OnChanges {
  @Input() player: Player;
  @Input() isPlayersTurn: boolean;

  constructor(private connectionService: ConnectionService) { 
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.player){
      this.player = changes.player.currentValue;
    }
  }

  revealCard(){
    this.connectionService.sendEvent("RequestCardReveal", this.player.id);
  }
}
