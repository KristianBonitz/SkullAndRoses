import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public gamePlayers: Player[] = [];

  constructor(private connectionService: ConnectionService) {
    this.subscribeToPlayerList();
  }

  addPlayerToGame(player: Player) {
    this.connectionService.sendEvent("SendPlayerReady", player);
  }

  updatePlayer(id: number, player: Player) {
    player.name = name;
    // connection "update name", player.id, player.name
    return player;
  }

  subscribeToPlayerList() {
    this.connectionService.playerReady.subscribe((player: Player) => {
      //if (player.id !== this.clientPlayer.id) {
        this.gamePlayers.push(player);
      //}
    });
  }
}
