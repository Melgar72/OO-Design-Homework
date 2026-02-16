/*
Class / Structure for player / dealer.
Actions: Hit, Stand.
Check for bust, push
*/
/*
Class / structure for deck of cards
Suits not req'd, but have 4 of each card
*/
var Player = /** @class */ (function () {
    function Player(hit, stand, bet, money) {
        this.hit = hit,
            this.stand = stand,
            this.bet = bet,
            this.money = money;
    }
    return Player;
}());
var House = /** @class */ (function () {
    function House(hit, stand) {
        this.hit = hit,
            this.stand = stand;
    }
    return House;
}());
var Cards = /** @class */ (function () {
    // enum h/s/d/c to make .rand pick? 
    function Cards(hearts, spades, diamonds, clubs) {
        // Pattern goes Card then Value
        this.hearts = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
            this.spades = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
            this.diamonds = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
            this.clubs = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10];
    }
    return Cards;
}());
console.log("Hello");
