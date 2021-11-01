import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { ClientActionComponent } from './game-room/client-action/client-action.component';
import { PlayerMatComponent } from './game-room/player-mat/player-mat.component';
import { GameStateComponent } from './game-room/game-state/game-state.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GameLobbyComponent,
    GameRoomComponent,
    ClientActionComponent,
    PlayerMatComponent,
    GameStateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: GameLobbyComponent, pathMatch: 'full' },
      { path: 'game', component: HomeComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
