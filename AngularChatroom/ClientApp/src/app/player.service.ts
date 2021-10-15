import { EventEmitter,Injectable, OnInit } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Player, SimplePlayer } from './player';


@Injectable({
  providedIn: 'root'
})

export class PlayerService implements OnInit{
  public gamePlayers: Player[] = [];
  public updatedPlayerList = new EventEmitter<Player[]>();
  public isClientHosting: boolean = true;

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit(){ }

  subscribeToPlayerEvents(){
    this.subscribeToAllPlayersRequest();
    this.subscribeToAllReadyPlayersResponse();
    this.subscribeToPlayerUpdates();
    this.subscribeToNewPlayers();
  }

  getAllPlayers(){
    return this.gamePlayers;
  }

  getSimplePlayerStates(){
    var simpleGameState: SimplePlayer[] = [];
    this.gamePlayers.forEach(player => {
      var simplePlayer: SimplePlayer = {
        id: player.id,
        bid: player.bid,
        playedCards: player.stack.length,
        hasPassedBidding: player.hasPassedBidding
      }
      simpleGameState.push(simplePlayer);
    });
    return simpleGameState;
  }

  addPlayerToGame(player: Player) {
    this.connectionService.sendEvent("SendPlayerReady", player);
  }

  subscribeToNewPlayers() {
    this.connectionService.playerReady.subscribe((player: Player) => {
      this.gamePlayers.push(player);
      this.updatedPlayerList.emit(this.gamePlayers)
    });
  }

  subscribeToAllPlayersRequest(){
    this.connectionService.playerListRequest.subscribe(_ => {
      this.gamePlayers.forEach(p => console.log(p.name))
      this.connectionService.sendEvent("SendAllReadyPlayers", this.gamePlayers);
    });
  }

  requestAllReadyPlayers(){
    this.subscribeToPlayerEvents();
    this.connectionService.sendEvent("RequestAllReadyPlayers", true);
  }

  subscribeToAllReadyPlayersResponse(){
    this.connectionService.playerListResponse.subscribe(
      (playerList: Player[]) => { this.updatePlayerList(playerList) });
  }

  updatePlayerList(playerList: Player[]) {
    playerList.forEach(p => {
        if(this.gamePlayers.find(gp => gp.id == p.id) == undefined){
          this.gamePlayers.push(p);
        }
      });
  }

  subscribeToPlayerUpdates(){
    this.connectionService.recievePlayerUpdate.subscribe((updatedPlayer: Player) => {
      console.log("player update" + updatedPlayer);
      var oldPlayerIndex = this.gamePlayers.findIndex(p => p.id === updatedPlayer.id);
      if(oldPlayerIndex > -1){
        this.gamePlayers[oldPlayerIndex] = updatedPlayer
      }
      this.updatedPlayerList.emit(this.gamePlayers);
    });
  }

  checkIfPlayerHadPassed(playerId: number){
    return this.gamePlayers.find(p => p.id == playerId).hasPassedBidding
  }
}
