export class Player {
  id: number;
  name: string;
  hand: boolean[];
  stack: number[];
  stackAmount: number;
  hasPassedBidding: boolean;
  bid: number;
  winCount: number;

  constructor(name?: string) {
    this.id = Math.random();
    this.name = name ? name : "";
    this.hand = [false, false, false, true]
    this.stack = [];
    this.stackAmount = this.stack.length;
    this.hasPassedBidding = false;
    this.bid = -1;
    this.winCount = 0;
  }

  get value() {
    return this.name + " - " + this.stackAmount.toString()
  }
}

//export class Card {
//  type: boolean
//} 