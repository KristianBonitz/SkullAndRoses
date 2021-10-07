import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { MessageTypes } from './message-types';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(
    private MSG: MessageTypes, 
    private connectionService: ConnectionService) { 

  }

  shareGameData(gameData: any){
    this.connectionService.sendEvent(this.MSG.SEND_GAME_STATE, gameData);
  }
}
