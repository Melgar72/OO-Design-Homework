"use strict";
/*
Class / Structure for player / dealer.
Actions: Hit, Stand.
Check for bust, push
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
Class / structure for deck of cards
Suits not req'd, but have 4 of each card
*/
class Player {
    hit;
    stand;
    bet;
    money;
    constructor(hit, stand, bet, money) {
        this.hit = hit,
            this.stand = stand,
            this.bet = bet,
            this.money = money;
    }
}
class House {
    hit;
    stand;
    constructor(hit, stand) {
        this.hit = hit,
            this.stand = stand;
    }
}
class Cards {
}
//# sourceMappingURL=Blackjack.js.map