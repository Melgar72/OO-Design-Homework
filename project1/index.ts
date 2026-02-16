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
    hit: number | boolean;          //  Read from input, (h)
    stand: number | boolean;        //  Read from input (s)
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
    hearts: (string | number)[];
    spades: (string | number)[];
    diamonds: (string | number)[];
    clubs: (string | number)[];

    // enum h/s/d/c to make .rand pick? 
    constructor(
        hearts: (string | number)[],
        spades: (string | number)[],
        diamonds: (string | number)[],
        clubs: (string | number)[] 
    ){  
        // Pattern goes Card then Value
        this.hearts = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
        this.spades = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
        this.diamonds = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
        this.clubs = ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10]
    }
}

console.log("Hello");