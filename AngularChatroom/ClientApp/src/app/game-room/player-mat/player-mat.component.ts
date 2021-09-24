import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../player';


@Component({
  selector: 'player-mat',
  templateUrl: './player-mat.component.html',
  styleUrls: ['./player-mat.component.css']
})
export class PlayerMatComponent implements OnInit {
  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}
