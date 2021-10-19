import { CardType, Card } from "./card";

export class SimplePlayer{
  id: number;
  bid: number;
  playedCards: number;
  hasPassedBidding: boolean;
}

export class Player {
  id: number;
  name: string;
  hand: Card[];
  stack: Card[];
  hasPassedBidding: boolean;
  bid: number;
  winCount: number;

  constructor(id?: number, name?: string) {
    this.id = id ? id : Math.random();
    this.name = name ? name : "";
    this.hand = this.generateNewHand()
    this.stack = [];
    this.hasPassedBidding = false;
    this.bid = -1;
    this.winCount = 0;
  }

  private generateNewHand(){
    var hand = [
      new Card(CardType.FLOWER),
      new Card(CardType.FLOWER),
      new Card(CardType.FLOWER),
      new Card(CardType.SKULL),
    ];
    return hand;
  }

  get value() {
    return this.name + " - " + this.cardsPlayed.toString()
  }

  get cardsPlayed(){
    return this.stack.length;
  }

  get isStillPlaying(){
    return (this.hand.length + this.stack.length) > 0
  }

  public moveCardToStack(card: Card){
    var pos = this.hand.indexOf(card);
    var card = this.hand.splice(pos, 1)[0];
    this.stack.push(card);
  }
}