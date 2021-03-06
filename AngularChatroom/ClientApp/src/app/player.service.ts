import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Player, SimplePlayer } from './player';


@Injectable({
  providedIn: 'root'
})

export class PlayerService implements OnInit {
  public gamePlayers: Player[] = [];
  public updatedPlayerList = new EventEmitter<Player[]>();
  public isClientHosting: boolean = true;
  private clientId: number;

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit() { }

  subscribeToPlayerEvents() {
    this.subscribeToAllPlayersRequest();
    this.subscribeToAllReadyPlayersResponse();
    this.subscribeToPlayerUpdates();
    this.subscribeToNewPlayers();
  }

  getClientId() {
    return this.clientId;
  }

  getAllPlayers() {
    return this.gamePlayers;
  }

  getPlayerById(playerId: number) {
    return this.gamePlayers.slice().find(p => p.id === playerId);
  }

  getSimplePlayerStates() {
    var simpleGameState: SimplePlayer[] = [];
    this.gamePlayers.filter(p => p.isStillPlaying).forEach(player => {
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

  addClientToGame(player: Player) {
    this.clientId = player.id;
    this.connectionService.sendEvent("SendPlayerReady", player);
  }

  resetPlayerRound() {
    this.gamePlayers.forEach(p => {
      p.startNewRound()
    });
  }

  subscribeToNewPlayers() {
    this.connectionService.playerReady.subscribe((player: Player) => {
      var newPlayer = new Player(player.id, player.name)
      this.gamePlayers.push(newPlayer)
      this.updatedPlayerList.emit(this.gamePlayers)
    });
  }

  subscribeToAllPlayersRequest() {
    this.connectionService.playerListRequest.subscribe(_ => {
      this.gamePlayers.forEach(p => console.log(p.name))
      this.connectionService.sendEvent("SendAllReadyPlayers", this.gamePlayers);
    });
  }

  requestAllReadyPlayers() {
    this.subscribeToPlayerEvents();
    this.connectionService.sendEvent("RequestAllReadyPlayers", true);
  }

  subscribeToAllReadyPlayersResponse() {
    this.connectionService.playerListResponse.subscribe(
      (playerList: Player[]) => { this.updatePlayerList(playerList) });
  }

  updatePlayerList(playerList: Player[]) {
    playerList.forEach(p => {
      if (this.gamePlayers.find(gp => gp.id == p.id) == undefined) {
        var newPlayer = new Player(p.id, p.name)
        this.gamePlayers.push(newPlayer)
      }
    });
  }

  subscribeToPlayerUpdates() {
    this.connectionService.recievePlayerUpdate.subscribe((updatedPlayer: Player) => {
      console.log("player update" + updatedPlayer);
      var oldPlayerIndex = this.gamePlayers.findIndex(p => p.id === updatedPlayer.id);
      if (oldPlayerIndex > -1 && this.gamePlayers[oldPlayerIndex].id !== this.clientId) {
        this.updatePlayer(this.gamePlayers[oldPlayerIndex], updatedPlayer)
      }
    });
  }

  updatePlayer(oldPlayer, newPlayer) {
    if (oldPlayer.hand !== newPlayer.hand) { oldPlayer.hand = newPlayer.hand }
    if (oldPlayer.stack !== newPlayer.stack) { oldPlayer.stack = newPlayer.stack }
    if (oldPlayer.bid !== newPlayer.bid) { oldPlayer.bid = newPlayer.bid }
    if (oldPlayer.hasPassedBidding !== newPlayer.hasPassedBidding) { oldPlayer.hasPassedBidding = newPlayer.hasPassedBidding }
    if (oldPlayer.winCount !== newPlayer.winCount) { oldPlayer.winCount = newPlayer.winCount }
  }

  isPlayerInTheRound(playerId: number) {
    var player = this.getPlayerById(playerId);
    return player.isStillPlaying
  }
}
