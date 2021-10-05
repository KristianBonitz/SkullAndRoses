import { runInThisContext } from "vm";
import { CardType, Card } from "./card";

export class Player {
  id: number;
  name: string;
  hand: Card[];
  stack: Card[];
  stackAmount: number;
  hasPassedBidding: boolean;
  bid: number;
  winCount: number;

  constructor(name?: string) {
    this.id = Math.random();
    this.name = name ? name : "";
    this.hand = this.generateNewHand()
    this.stack = [];
    this.stackAmount = this.stack.length;
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

  public moveCardToStack(card: Card){
    var pos = this.hand.indexOf(card);
    var card = this.hand.splice(pos, 1)[0];
    this.stack.push(card);
  }
}