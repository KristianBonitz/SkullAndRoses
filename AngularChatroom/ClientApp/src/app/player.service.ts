import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public generatePlayers(names: string[]) {
    return names;
  }
}
