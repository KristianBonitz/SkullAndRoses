import { Injectable } from "@angular/core";
import { SimplePlayer } from './player';

export enum GamePhases{
    PLAYCARDS,
    PLAYORBID,
    BIDDING,
    CHALLENGE, 
    ROUNDCOMPLETE,
    GAMECOMPLETE
}

@Injectable({
    providedIn: 'root'
})

export class GamePhaseService {
    constructor(){}

    updateGamePhase(gamePhase: GamePhases){
        switch(gamePhase){
            case GamePhases.PLAYCARDS:
                return GamePhases.PLAYORBID;
            case GamePhases.PLAYORBID:
                return GamePhases.BIDDING;
            case GamePhases.BIDDING:
               return GamePhases.CHALLENGE;
            case GamePhases.CHALLENGE:
                return GamePhases.ROUNDCOMPLETE;
            case GamePhases.ROUNDCOMPLETE:
                    return GamePhases.GAMECOMPLETE;
            default:
                return GamePhases.PLAYCARDS;
        }
    }

    setPhaseToGameComplete(){
        return GamePhases.GAMECOMPLETE;
    }

    resetGamePhase(){
        return GamePhases.PLAYCARDS;
    }

    doesGamePhaseChange(gamePhase: GamePhases, playerStates: SimplePlayer[]){
        switch(gamePhase){
            case GamePhases.PLAYCARDS:
                return this.canStartBidding(playerStates);
            case GamePhases.PLAYORBID:
                return this.hasBiddingStarted(playerStates);
            case GamePhases.BIDDING:
                return this.isOneBidderLeft(playerStates);
        }
    }

    private canStartBidding(playerStates: SimplePlayer[]){
        //has every player played at least one card
        return playerStates.every(p => p.playedCards > 0);
    }

    private hasBiddingStarted(playerStates: SimplePlayer[]){
        //has any player started bidding
        return playerStates.some(p => p.bid > 0);
    }

    private isOneBidderLeft(playerStates: SimplePlayer[]){
        var playersStillBidding = playerStates.filter(p => p.hasPassedBidding == false).length;
        if(playersStillBidding == 0){
            throw Error("Every player has passed")
        }else{
            return (playersStillBidding == 1)
        }
    }
}
