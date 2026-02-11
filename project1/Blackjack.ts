/*
Class / Structure for player / dealer. 
Actions: Hit, Stand. 
Check for bust, push
*/

/*
Class / structure for deck of cards
Suits not req'd, but have 4 of each card
*/

class Player {
    hit: number | boolean;
    stand: number | boolean;
    bet: number;
    money: number;

    constructor(
        hit: number | boolean,
        stand: number | boolean,
        bet: number,
        money: number
    ){
        this.hit = hit,
        this.stand = stand,
        this.bet = bet,
        this.money = money
    }
}

class House {
    hit: number | boolean;
    stand: number | boolean;

    constructor(
        hit: number | boolean,
        stand: number | boolean
    ){
        this.hit = hit,
        this.stand = stand
    }
}

class Cards {

}

