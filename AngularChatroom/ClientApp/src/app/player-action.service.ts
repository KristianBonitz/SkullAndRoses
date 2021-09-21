import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerActionService {

  constructor(private connectionService: ConnectionService) {
  }

  startGame() {
    this.connectionService.sendEvent("StartGame", null);
  }
}
