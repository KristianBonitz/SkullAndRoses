import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  generatePlayer(name: string): Player {
    return new Player(name);
  }
}
