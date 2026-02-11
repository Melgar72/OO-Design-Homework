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
    function Cards() {
    }
    return Cards;
}());
var message = "Hello";
console.log(message);
