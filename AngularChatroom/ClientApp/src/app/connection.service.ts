import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {
  public connectionEstablished = new EventEmitter<Boolean>();
  public playerReady = new EventEmitter<Player>();
  public playerListRequest = new EventEmitter<boolean>();
  public playerListResponse = new EventEmitter<Player[]>();
  public recieveGameState = new EventEmitter<Player[]>();
  public gameStarting = new EventEmitter<boolean>();
  public turnEnded = new EventEmitter<number>();
  public recievePlayerUpdate = new EventEmitter<Player>();

  private isConnectionEstablished = false;
  private _hubConnection: HubConnection;  

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('/gamehub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.isConnectionEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 2000);
      });
  }

  private registerOnServerEvents(): void {
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
  }

  public sendEvent(message: string, data: any) {
    this._hubConnection.send(message, data);
  }
}
