import { EventEmitter, Injectable } from '@angular/core';
import { Card, CardData } from './card';
import { ConnectionService } from './connection.service';
import { GamePhases, GamePhaseService } from './game-phases';
import { MessageService } from './message-handler.service';
import { Player } from './player';
import { PlayerActionService } from './player-action.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public turnOver = new EventEmitter<boolean>();
  public roundOver = new EventEmitter<boolean>();
  public cardRevealed = new EventEmitter<boolean>();
  public challengeComplete = new EventEmitter<boolean>();
  public removeCard = new EventEmitter<boolean>();
  public gameComplete = new EventEmitter<boolean>();
  public turnOrder: number[];
  public phase: GamePhases = GamePhases.PLAYCARDS;
  private revealedCards: CardData[] = [];
  public cardsToReveal: number = -1;

  constructor(private connectionService: ConnectionService,
    private gamePhaseService: GamePhaseService,
    private playerService: PlayerService,
    private playerActionService: PlayerActionService) {
    this.subscribeToTurnEnded();
    this.subscribeToRoundEnded();
    this.subscribeToCardRevealRequests();
    this.subscribeToCardReveal();
    this.subscribeToGameOverMessages();
  }

  currentTurnPlayerId() {
    return this.turnOrder[0];
  }

  currentTurnPlayer(): Player {
    return this.playerService.getPlayerById(this.currentTurnPlayerId());
  }

  getHighestBidPlayer() {
    return this.playerService.getAllPlayers().slice().reduce((p1, p2) => p1.bid > p2.bid ? p1 : p2)
  }

  endTurn(player: Player) {
    this.connectionService.sendEvent("EndTurn", player.cleanPlayerData);
  }

  sendEndOfRoundMessage() {
    this.connectionService.sendEvent("RoundOver", true);
  }

  endRound() {
    if (this.isOnePlayerLeft()) {
      this.setActivePlayer();
      this.gameOver(this.currentTurnPlayerId());
    } else {
      this.phase = this.gamePhaseService.resetGamePhase();
      this.playerService.resetPlayerRound();
      this.cardsToReveal = -1;
      this.revealedCards = [];
      this.roundOver.emit(true);
    }
  }

  subscribeToRoundEnded() {
    this.connectionService.endRound.subscribe(_ => {
      this.endRound();
    })
  }

  subscribeToTurnEnded() {
    this.connectionService.turnEnded.subscribe((player: Player) => {
      if (player.id == this.turnOrder[0]) {
        if (player.id !== this.playerService.getClientId()) {
          this.playerService.updatePlayer(
            this.playerService.getPlayerById(player.id),
            player
          );
        }
        this.setActivePlayer();
        this.checkAndUpdateGamePhase();
        this.turnOver.emit(true);
      } else {
        throw Error("Turns aren't matching internal sysetem");
      }
    });
  }

  subscribeToCardRevealRequests() {
    this.connectionService.revealRequst.subscribe((playerId: number) => {
      if (this.playerService.getClientId() == playerId) {
        this.playerActionService.revealACard(
          this.playerService.getPlayerById(playerId)
        );
      }
    });
  }

  sendRevealedCard(playerId: number, card: Card) {
    var cardData: CardData = { ownerId: playerId, card: card }
    this.connectionService.sendEvent("RevealCard", cardData)
  }

  subscribeToCardReveal() {
    this.connectionService.cardRevealed.subscribe((cardData: CardData) => {
      var rCard = new Card(cardData.card.type);
      cardData.card = rCard;

      if (cardData.card.toString == "🌼" || cardData.card.toString == "💀") {
        var isFlowerCard = rCard.toString == "🌼";
        this.cardsToReveal -= isFlowerCard ? 1 : 0
        this.revealedCards.push(cardData);
        this.cardRevealed.emit(true);
        this.evaluateChallenge(isFlowerCard, cardData.ownerId);
      } else {
        throw console.error("Unknown card revealed!");
      }
    });
  }

  getRevealedCards() {
    return this.revealedCards.slice();
  }

  getCardsToReveal() {
    return this.cardsToReveal;
  }

  evaluateChallenge(isFlower: boolean, cardOwner?: number) {
    console.log("revealed a flower card? " + isFlower + "    card owned by: " + this.playerService.getPlayerById(cardOwner).name);

    if (isFlower && this.cardsToReveal == 0) {
      this.challengeSuccess();
    } else if (!isFlower) {
      var isClientChallenging = this.playerService.getClientId() == this.currentTurnPlayerId();
      this.losingCardActions(cardOwner, isClientChallenging, this.currentTurnPlayer().totalCards);
      this.challengeFailed(isClientChallenging);
    }
  }

  challengeSuccess() {
    this.updateGamePhase();

    var winningPlayer = this.currentTurnPlayer();
    this.playerActionService.successfulChallenge(winningPlayer);
    if (winningPlayer.winCount > 1) {
      this.gameOver(winningPlayer.id);
    }
    this.challengeComplete.emit(true);
  }

  challengeFailed(isClientChallenging: boolean) {
    this.updateGamePhase();

    if (this.currentTurnPlayer().totalCards <= (isClientChallenging ? 0 : 1)) {
      this.setActivePlayer();
    }

    if (this.isOnePlayerLeft()) {
      this.setActivePlayer();
      this.gameOver(this.currentTurnPlayerId());
    }

    this.challengeComplete.emit(true);
  }

  losingCardActions(cardOwnerId: number, isClientLosingCards: boolean, numberOfCardsLeft: number) {
    if (isClientLosingCards &&
      cardOwnerId == this.playerService.getClientId() &&
      numberOfCardsLeft > 1) {
      this.removeCard.emit(true);
    } else {
      var losingPlayer = this.currentTurnPlayer()
      this.playerActionService.removeACard(losingPlayer);
    }
  }

  updateGamePhase() {
    this.phase = this.gamePhaseService.updateGamePhase(this.phase);
  }

  isOnePlayerLeft() {
    return this.playerService.getAllPlayers().filter(p => p.totalCards > 0).length == 1;
  }

  gameOver(playerId) {
    console.log(playerId + " is winner");
    this.endGame();
  }

  sendGameOverMessage(winningPlayerId: number) {
    this.connectionService.sendEvent("GameOver", winningPlayerId);
  }

  subscribeToGameOverMessages() {
    this.connectionService.endGame.subscribe(_ => {
      this.endGame();
    })
  }

  endGame() {
    this.phase = this.gamePhaseService.setPhaseToGameComplete();
    this.gameComplete.emit(true);
  }


  checkAndUpdateGamePhase() {
    if (this.gamePhaseService.doesGamePhaseChange(
      this.phase, this.playerService.getSimplePlayerStates())) {
      this.phase = this.gamePhaseService.updateGamePhase(this.phase);
    }
    if (this.phase == GamePhases.CHALLENGE && this.cardsToReveal < 0) {
      this.cardsToReveal = this.getHighestBidPlayer().bid;
    }
  }

  createPlayerOrder(playerList: Player[]) {
    var sortedIdList = playerList.sort((a, b) => a.id - b.id).map(a => a.id);
    this.turnOrder = sortedIdList;
  }

  setActivePlayer() {
    if (
      this.phase == GamePhases.ROUNDCOMPLETE ||
      this.phase == GamePhases.GAMECOMPLETE) {
      // set the player for the next round or next game
      do {
        this.cycleTurn();
      } while (this.playerService.getPlayerById(this.currentTurnPlayerId()).totalCards <= 0);
    } else {
      // set the player for the next turn in the round
      do {
        this.cycleTurn();
      } while (!this.playerService.isPlayerInTheRound(this.currentTurnPlayerId()));
    }
  }

  cycleTurn() {
    var currentTurn = this.turnOrder[0];
    this.turnOrder = this.turnOrder.slice(1);
    this.turnOrder.push(currentTurn);
  }
}
