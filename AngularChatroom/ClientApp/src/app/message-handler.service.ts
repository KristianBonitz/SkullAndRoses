import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { MessageTypes } from './message-types';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(
    private msg: MessageTypes, 
    private connectionService: ConnectionService) { 
  }

  shareGameData(gameData: any){
    this.connectionService.sendEvent(this.msg.SEND_GAME_STATE, gameData);
  }
}
