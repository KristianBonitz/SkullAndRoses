import { Component, OnInit } from '@angular/core';
import * as SignalR from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  public userMsg: string = "";
  public userName: string = "";

  public messages: string[] = [];
  public connection: SignalR.HubConnection;

  ngOnInit() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("/chathub")
      .build();

    this.connection.on("ReceiveMessage", (user, msg) => {
      this.messages.push(msg);
    });

    this.connection.start()
      .then(() => { this.connection.send("SendMessage", "System", "Connection Started") })
      .catch(err => { console.error(err) })
  }
  
  sendMessage() {
    console.log("Sending Message");
    this.connection.send("SendMessage", this.userName, this.userMsg);
  }
}
