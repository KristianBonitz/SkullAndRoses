import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Player } from '../player';
import { ConnectionService } from '../connection.service';
import { PlayerActionService } from '../player-action.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent implements OnInit {
  @Input() client: Player;
  @Input() joiningPlayer: Player;
  @Input() isGameInProgress = false;
  public nonClientPlayers: Player[] = [];

  constructor(private playerActionService: PlayerActionService,
    private connectionService: ConnectionService,
    private playerService: PlayerService) {
  }

  ngOnInit() {
    this.nonClientPlayers = this.getAllNonClientPlayers();
  }

  getAllNonClientPlayers() {
    return this.playerService.gamePlayers.filter(
    player => player.id !== this.client.id)
  }
}