import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { MessageTypes } from './message-types';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  msg: MessageTypes;
  
  constructor(
    private connectionService: ConnectionService) { 
      this.msg = new MessageTypes();
  }

  shareGameData(gameData: any){
    this.connectionService.sendEvent(this.msg.SEND_GAME_STATE, gameData);
  }
}
