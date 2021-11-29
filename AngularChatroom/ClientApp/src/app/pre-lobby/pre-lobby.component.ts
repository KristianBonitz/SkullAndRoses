import { Component } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'pre-lobby',
  templateUrl: './pre-lobby.component.html',
  styleUrls: ['./pre-lobby.component.css']
})
export class PreLobbyComponent {
  public clientname: string;
  public roomId: string;

  public joiningRoom: boolean = false;
  public inLobby: boolean = false;

  constructor() { }

  moveUserToLobby(roomId?: string) {
    //check if username created before joining room
    if (roomId) {
      console.log(roomId)
    } else {
      this.roomId = Math.random().toString(10).substr(2, 4);
    }
    console.log("User joining room: " + this.roomId);
    this.inLobby = true;
  }

  subscribeToLeaveLobby() {

  }

}
