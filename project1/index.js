//import readline from "readline-sync";
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
        this.hearts = hearts,
            this.spades = spades,
            this.diamonds = diamonds,
            this.clubs = clubs;
    }
    Cards.prototype.randomNum = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    //  Will need to be modified for removal of cards (play through full deck)
    Cards.prototype.randomCard = function (suit, value) {
        suit = this.randomNum(1, 4);
        value = this.randomNum(1, 13);
        return value; // use to track value, will need to change return type to track suit
    };
    return Cards;
}());
//const move = readline.question("(h)it or (s)tay ");
var player = new Player(false, false, 0, 100);
var house = new House(false, false);
var deck = new Cards(['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10], ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10], ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10], ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10]);
for (var i = 0; i < 3; i++) {
    console.log("House: ");
    console.log("Player: ");
}
