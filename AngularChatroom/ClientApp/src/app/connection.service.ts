import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {
  public connectionEstablished = new EventEmitter<Boolean>();
  public joinedRoom = new EventEmitter<boolean>();
  public playerReady = new EventEmitter<Player>();
  public playerListRequest = new EventEmitter<boolean>();
  public playerListResponse = new EventEmitter<Player[]>();
  public recieveGameState = new EventEmitter<Player[]>();
  public gameStarting = new EventEmitter<boolean>();
  public turnEnded = new EventEmitter<Player>();
  public recievePlayerUpdate = new EventEmitter<Player>();
  public endRound = new EventEmitter<boolean>();
  public endGame = new EventEmitter<any>();
  public revealRequst = new EventEmitter<any>();
  public cardRevealed = new EventEmitter<any>();

  private _hubConnection: HubConnection;
  private roomId: string;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.registerOnLifeCycleEvents();
    this.startConnection();
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('/gamehub')
      .withAutomaticReconnect()
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
        this.joinRoom();
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 2000);
      });
  }

  private registerOnLifeCycleEvents(): void {
    this._hubConnection.onclose(_ => {
      this.leaveRoom();
    })
    this._hubConnection.onreconnected(_ => {
      this.joinRoom()
    });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('InRoom', _ => {
      this.joinedRoom.emit(true);
    });

    this._hubConnection.on('RecieveReady', (data: any) => {
      this.playerReady.emit(data);
    });

    this._hubConnection.on('StartingGame', (data: any) => {
      this.gameStarting.emit(data);
    });

    this._hubConnection.on('RequestingAllReadyPlayers', (data: any) => {
      this.playerListRequest.emit(data);
    });

    this._hubConnection.on('SendingAllReadyPlayers', (data: any) => {
      this.playerListResponse.emit(data);
    });

    this._hubConnection.on('SendingGameState', (data: any) => {
      this.recieveGameState.emit(data);
    });

    this._hubConnection.on('EndingTurn', (data: any) => {
      this.turnEnded.emit(data);
    });

    this._hubConnection.on('PlayerUpdated', (data: any) => {
      this.recievePlayerUpdate.emit(data);
    });

    this._hubConnection.on("EndRound", (data: any) => {
      this.endRound.emit(data);
    });

    this._hubConnection.on("EndGame", (data: any) => {
      this.endGame.emit(data);
    });

    this._hubConnection.on("RevealCardRequest", (data: any) => {
      this.revealRequst.emit(data);
    });

    this._hubConnection.on("CardRevealed", (data: any) => {
      this.cardRevealed.emit(data);
    });
  }

  public sendEvent(message: string, data: any) {
    this._hubConnection.send(message, this.roomId, this._hubConnection.connectionId, data);
  }

  public setRoom(roomId: string) {
    this.roomId = roomId;
  }

  public joinRoom() {
    this._hubConnection.send("JoinGroup", this._hubConnection.connectionId, this.roomId)
  }

  public leaveRoom() {
    this._hubConnection.send("LeaveGroup", this._hubConnection.connectionId, this.roomId)
  }
}
