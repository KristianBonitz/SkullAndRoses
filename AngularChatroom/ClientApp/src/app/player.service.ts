import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private connectionService: ConnectionService) {

  }

  addPlayerToGame(player: Player) {
    this.connectionService.sendEvent("SendPlayerReady", player)
  }

  updatePlayerName(name: string, player: Player) {
    player.name = name;
    // connection "update name", player.id, player.name
    return player;
  }
}
