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
    return [
      new Card(CardType.FLOWER),
      new Card(CardType.FLOWER),
      new Card(CardType.FLOWER),
      new Card(CardType.SKULL),
    ];
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
  
  public startNewRound(){
    this.collectCards();
    this.hasPassedBidding = false;
    this.bid = -1;
  }

  public revealTopCardOfStack(){
    var revealedCard = this.stack.pop()
    this.hand.push(revealedCard);
    return revealedCard;
  }

  get cleanPlayerData(){
    return {
      id : this.id,
      bid : this.bid,
      hand: this.dummyCardArray(this.hand),
      stack: this.dummyCardArray(this.stack),
      hasPassedBidding : this.hasPassedBidding,
      winCount : this.winCount
    }
  }

  private dummyCardArray(cards: Card[]){
    var nullArray: Card[] = [];
    cards.forEach(_ => {
      nullArray.push(new Card(CardType.NULL))
    });
    return nullArray
  }

  public collectCards(){
    this.hand = this.hand.concat(this.stack);
    this.stack = [];
  }

  public removeCard(pos?: number){
    this.collectCards();

    var cardNum = pos != undefined ? pos : Math.floor(this.hand.length * Math.random());
    this.hand.splice(cardNum, 1);
  }
}