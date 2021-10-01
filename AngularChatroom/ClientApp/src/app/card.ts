export enum CardType{
    SKULL = 1,
    FLOWER = 0
}

export class Card{
    type: CardType;

    constructor(type: CardType){
        this.type = type;
    }

    get value(){
        return this.type.valueOf();
    }

    get toString(){
        if (this.type == CardType.FLOWER){
            return "🌼"
        }
        if(this.type == CardType.SKULL){
            return "💀"
        }
    }
}
