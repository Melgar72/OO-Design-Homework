import * as readline from "readline-sync";

// Diego Melgar-Aguilar

class Game {
    play: boolean;

    constructor(
        play: boolean
    ){
        this.play = play;
    }
    
    gameState() : boolean{
        const again = readline.question("(p)lay again or (l)eave");
        return again.startsWith("p");
    }

}

class Player {
    hit: boolean;          //  Read from input, (h)
    stand: boolean;        //  Read from input (s)
    bet: number;
    money: number;
    cards: number[];
    score: number;
    bust: boolean;
    cardCount: number;

    constructor(
        hit: boolean,
        stand: boolean,
        bet: number,
        money: number,
        cards: number[],
        score: number,
        bust: boolean,
        cardCount: number
    ){
        this.hit = hit;
        this.stand = stand;
        this.bet = bet;
        this.money = money;
        this.cards = cards;
        this.score = score;
        this.bust = bust;
        this.cardCount = cardCount;
    }

    move() : boolean {
        const move = readline.question("(h)it or (s)tay ");
        return move.startsWith("h");
    }
}

class Cards {
    hearts: number[];
    spades: number[];
    diamonds: number[];
    clubs: number[];

    // enum h/s/d/c to make .rand pick? 
    constructor(
        hearts: number[],
        spades: number[],
        diamonds: number[],
        clubs: number[] 
    ){  
        // Pattern goes Card then Value
        this.hearts = hearts;
        this.spades = spades;
        this.diamonds = diamonds;
        this.clubs = clubs;
    }

    randomNum(min: number, max: number): number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //  Will need to be modified for removal of cards (play through full deck)
    randomCard(value: number): number{
        //suit = this.randomNum(1, 4);
        value = this.randomNum(1, 13);
        return value;   // use to track value, will need to change return type to track suit
    }

}


/*

    ************

    IF HAND WOULD BUST, CHECK FOR ACES / 1
    NEEDS TO BE DONE AT ANY POINT IN TIME WHERE WOULD BUST

    MAKE ACTUAL DECK, NOT JUST RANDOM RANGE PULLS
    TRACK CARD USAGE IF POSSIBLE

    CLEAN UP UNUSED CODE 

    ************


*/



let game = new Game(true);

while(game.play == true){
    let player = new Player(false, false, 0, 100, [], 0, false, 0);
    let house = new Player(false, false, 0, 0, [], 0, false, 0);
    let deck = new Cards(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    );

    // First, deal two cards to house and player, alternating between
    for (let i = 0; i < 2; i++){
        house.cards.push(deck.randomNum(1, 11));
        house.score += house.cards[i] || 0;
        house.cardCount++;
        player.cards.push(deck.randomNum(1, 11));
        player.score += player.cards[i] || 0;
        player.cardCount++;
    }  
    // Reveal the first card of the house, reveal both of the player
    console.log("House: [", house.cards[0], "] [?]");
    console.log("Player: [", player.cards[0], "] [", player.cards[1], "] Total: ", player.score);

    if(player.score == 21){ // Opening hand was a blackjack
        player.stand = true;
    }

    // Player may hit or stand
    while(!player.stand && !player.bust){
        if(player.move() == true){
            console.log("Your card is dealt...");
            player.hit = true;
            player.cards.push(deck.randomNum(2, 11));
            player.cardCount++;
            player.score += player.cards[player.cardCount - 1] || 0;
            // check ace for bust
            if(player.cards[player.cards.length - 1] == 11 && player.score > 21){
                player.cards[player.cards.length -1] = 1;
                player.score -= 10;
            }
            console.log("House: [", house.cards[0], "] [?]");
            console.log("Player: ", player.cards, " ", player.score);
            if(player.score == 21){
                player.stand = true;
            } else if(player.score > 21){
                player.bust = true;
            }
        } else{
            player.stand = true;
        }
    }

    // If a player stands or busts, reveal the house hand
    console.log("Let's see what the house has...");
    console.log("House : ", house.cards, " ", house.score);
    console.log("Player: ", player.cards, " ", player.score);

    // House hits until minimum of 17
    if(house.score >= 17){
        house.stand = true;
    }
    while(!house.stand && !house.bust && !player.bust){
        console.log("The house plays on...");
        house.hit = true;
        house.cards.push(deck.randomNum(1, 11));
        house.cardCount++;
        house.score += house.cards[house.cardCount - 1] || 0;
        if(house.cards[house.cards.length - 1] == 11 && house.score > 21){
                house.cards[house.cards.length - 1] = 1;
                house.score -= 10;
            }
        console.log("House: ", house.cards," ", house.score);
        console.log("Player: ", player.cards, " ", player.score);
        if(house.score > 21){
            house.bust = true;
        } else if(house.score >= 17){
            house.stand = true;
        } 
    }

    // Who won? 
    if(house.score > player.score && house.stand == true){
        console.log("The house always wins... Would you like to try again? (House wins)");
    }
    if(player.score > house.score && player.stand == true){
        console.log("Well played. Try your luck again? (Player wins)");
    }
    if(house.stand == true && player.bust == true){
        console.log("The house always wins... be careful pushing your luck. (House wins)");
    }
    if(house.bust === true && player.stand == true){
        console.log("Well played, always happy to see a player win some back. (Player wins)");
    }
    if(house.score == player.score){
        console.log("Rather close game. Maybe a little more? (Push. Tied game.)");
    }

    if(game.gameState() == false){
        game.play = false;
    }
    
}


/*

    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10]
*/