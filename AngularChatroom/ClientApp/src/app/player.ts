const SKULL = true;
const ROSE = false;

export class Player {
  id: number;
  name: string;
  stack: number[];
  stackAmount: number;
  hasPassedBidding: boolean;
  bid: number;
  winCount: number;

  constructor(name: string) {
    this.id = Math.random();
    this.name = name;
    this.hand = [ROSE, ROSE, ROSE, SKULL]
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