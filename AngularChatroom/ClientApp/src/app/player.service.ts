import { EventEmitter,Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Player } from './player';
import { GameService } from './game.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public gamePlayers: Player[] = [];
  public updatedPlayerList = new EventEmitter<Player[]>();
  public isClientHosting: boolean = true;

  constructor(private connectionService: ConnectionService,
              private gameService: GameService  ) {
    this.subscribeToPlayerList();
  }

  getAllPlayers(){
    return this.gamePlayers;
  }

  addPlayerToGame(player: Player) {
    this.connectionService.sendEvent("SendPlayerReady", player);
    this.subscribeToGameStateUpdates();
    this.gameService.joinGame();
  }

  subscribeToPlayerList() {
    this.connectionService.playerReady.subscribe((player: Player) => {
      this.gamePlayers.push(player);
      this.gameService.shareGameData(this.gamePlayers);
      this.updatedPlayerList.emit(this.gamePlayers)
    });
  }

  subscribeToGameStateUpdates() {
    this.gameService.gameState.subscribe((playerList: Player[]) => {
      if (this.gamePlayers.length < playerList.length) {
        this.gamePlayers = playerList
        this.updatedPlayerList.emit(this.gamePlayers)
        this.gameService.gameState.unsubscribe();
      }
    })
  }
}
