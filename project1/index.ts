import * as readline from "readline-sync";

// Diego Melgar-Aguilar

class Game {
    play: boolean;  // true, play | false, quit

    constructor(
        play: boolean
    ){
        this.play = play;
    }
    
    gameState() : boolean{
        let repeat = true;
        let answer = false;
        while(repeat == true){
            const again = readline.question("(p)lay or (q)uit ");
            if(again.startsWith("p")){
                answer = true;    // if input is "p", return true
                repeat = false;
            } 
            if(again.startsWith("q")){
                answer = false;   // if input is "q", return false
                repeat = false;
            }
            if(!again.startsWith("p") || !again.startsWith("q")){
                continue;
            }
        }
        return answer;
    }

    mainMenu() : boolean {
        let repeat = true;
        let answer = false;
        while(repeat == true){
            const mainMenu = readline.question(
                "\n\n\nWelcome to the Blackjack table. Care to play?\n(y)es (n)o "
            );
            if(mainMenu.startsWith("y")){
                answer = true;
                repeat = false;
            }
            if(mainMenu.startsWith("n")){
                answer = false;
                repeat = false;
            }
            if(repeat){continue};
        }
        return answer;
    }

}

class Player {
    hit: boolean;               //  Read from input, (h)
    stand: boolean;             //  Read from input (s)
    bet: number;                //  Pre-emptive setting of field, in case of extra credit
    money: number;              //  Pre-emptive setting of field, in case of extra credit
    cards: [string, number][];  //  Cards stored as a tuple holding card display and value
    score: number;              //  Tracks Player score, modified by updateScore()
    bust: boolean;              //  Updated on checks for over 21, dictates if player can hit / win
    cardCount: number;          //  Used for traversing cards[][]
    name: string;               //  Label for player / house. Used for showCards() string manipulation

    constructor(
        hit: boolean,
        stand: boolean,
        bet: number,
        money: number,
        cards: [string, number][],
        score: number,
        bust: boolean,
        cardCount: number,
        name: string
    ){
        this.hit = hit;
        this.stand = stand;
        this.bet = bet;
        this.money = money;
        this.cards = cards;
        this.score = score;
        this.bust = bust;
        this.cardCount = cardCount;
        this.name = name;
    }

    move() : boolean {
        let repeat = true;
        let answer = false;
        while(repeat == true){
            const move = readline.question("(h)it or (s)tay ");
            if(move.startsWith("h")){
                answer = true;    // if input is "h", return true
                repeat = false;
            } 
            if(move.startsWith("s")){
                answer = false;   // if input is "s", return false
                repeat = false;
            }
            if(!move.startsWith("s") || !move.startsWith("h")){
                continue;
            }
        }
        return answer;
    }

    updateScore(num : number) {
        this.score += this.cards[num][1];
    }

    showCards(num: number, player: string) {
        let cardFaces : string[] = [];
        let baseString = "";
        for(let i = 0; i < num; i++){
            cardFaces.push(this.cards[i][0]);
            baseString = baseString.concat("[", cardFaces[i], "]");
        }
        console.log(player, baseString, " Total Score: ", this.score);
    }
}

class Cards{

    // Each suit holds its cards as an array of tuples
    hearts: [string, number][];
    spades: [string, number][];
    diamonds: [string, number][];
    clubs: [string, number][];

    constructor(
        hearts: [string, number][],
        spades: [string, number][],
        diamonds: [string, number][],
        clubs: [string, number][]
    ){
        this.hearts = hearts;
        this.spades = spades;
        this.diamonds = diamonds;
        this.clubs = clubs;
    }

    // Random number generator for pulling random cards
    // math.random gives float between 0 and 1, looking to floor a value greater than 0
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    // ^ Source
    randomNum(min: number, max: number): number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); 
    }

    //  Will need to be modified for removal of cards (play through full deck)
    //  Selects random card from a random suit
    randomCard(player: Player) {
        switch(this.randomNum(1, 4)){
            case 1: {
                player.cards.push(this.hearts[this.randomNum(1, 13) - 1]);
                break;
            }
            case 2: {
                player.cards.push(this.spades[this.randomNum(1, 13) - 1]);
                break
            }
            case 3: {
                player.cards.push(this.diamonds[this.randomNum(1, 13) - 1]);
                break;
            }
            case 4: {
                player.cards.push(this.clubs[this.randomNum(1, 13) - 1]);
                break;
            }
        }
    }


}

let game = new Game(true);
if(!game.mainMenu()){
    game.play = false;
};

while(game.play == true){
    let player = new Player(false, false, 0, 100, [], 0, false, 0, "Player");
    let house = new Player(false, false, 0, 0, [], 0, false, 0, "House");
    let deck = new Cards(
    [
        ['A', 11], 
        ['2', 2], 
        ['3', 3],
        ['4', 4], 
        ['5', 5], 
        ['6', 6], 
        ['7', 7], 
        ['8', 8], 
        ['9', 9], 
        ['10', 10], 
        ['J', 10], 
        ['Q', 10], 
        ['K', 10]
    ], [
        ['A', 11], 
        ['2', 2], 
        ['3', 3],
        ['4', 4], 
        ['5', 5], 
        ['6', 6], 
        ['7', 7], 
        ['8', 8], 
        ['9', 9], 
        ['10', 10], 
        ['J', 10], 
        ['Q', 10], 
        ['K', 10]
    ], [
        ['A', 11], 
        ['2', 2], 
        ['3', 3],
        ['4', 4], 
        ['5', 5], 
        ['6', 6], 
        ['7', 7], 
        ['8', 8], 
        ['9', 9], 
        ['10', 10], 
        ['J', 10], 
        ['Q', 10], 
        ['K', 10]
    ] , [
        ['A', 11], 
        ['2', 2], 
        ['3', 3],
        ['4', 4], 
        ['5', 5], 
        ['6', 6], 
        ['7', 7], 
        ['8', 8], 
        ['9', 9], 
        ['10', 10], 
        ['J', 10], 
        ['Q', 10], 
        ['K', 10]
    ]
);

    // First, deal two cards to house and player, alternating between
    for (let i = 0; i < 2; i++){
        deck.randomCard(house);     //  Deal card to house
        house.updateScore(i);       //  Update house score
        house.cardCount++;          //  Increase house card amount for arrays
        deck.randomCard(player);    //  Deal card to player
        player.updateScore(i);      //  Update player score
        player.cardCount++;         //  Increase player card amount for arrays
    }  

    // Reveal the first card of the house, reveal both of the player
    console.log("House: [", house.cards[0][0], "] [?]");
    player.showCards(player.cardCount, player.name);

    // if opening hand is blackjack, automatic stand to avoid hitting
    if(player.score == 21){
        player.stand = true;
    }

    // Player may hit or stand if they have not already stood or busted
    while(!player.stand && !player.bust){
        if(player.move() == true){
            console.log("Your card is dealt...");
            player.hit = true;
            deck.randomCard(player);                        //  Deal card to player
            player.cardCount++;                             //  Increase player card count
            player.updateScore(player.cardCount - 1);       //  Increase player score
            
            // Check if player would bust while an Ace is scored as an 11,
            // then update 11 to a 1 to avoid bust
            for(let i = 0; i < player.cardCount; i++){
                if(player.score <= 21){break;}
                if(player.cards[i][1] == 11){
                    player.cards[i][1] = 1;
                    player.score -= 10;
                }
            }
            console.log("House: [", house.cards[0][0], "] [?]");
            player.showCards(player.cardCount, player.name);
            if(player.score == 21){
                player.stand = true;                        // Automatic stand on 21
            } else if(player.score > 21){
                player.bust = true;                         // Bust over 21
            }
        } else {
            player.stand = true;                            // Player chooses to stand
        }
    }

    // If a player stands or busts, reveal the house hand
    console.log("Let's see what the house has...");
    house.showCards(house.cardCount, house.name);
    player.showCards(player.cardCount, player.name);

    // House hits until minimum of 17
    // Check if house already has at least 17, or player has busted
    if(house.score >= 17 || player.bust == true){
        house.stand = true;
    }
    while(!house.stand && !house.bust && !player.bust){
        console.log("The house plays on...");
        house.hit = true;
        deck.randomCard(house);                             //  Deal card to house
        house.cardCount++;                                  //  Increase house card count
        house.updateScore(house.cardCount - 1);             //  Update house score

        // Check if house would bust while an Ace is scored as an 11,
        // then update 11 to a 1 to avoid bust
        for(let i = 0; i < house.cardCount; i++){
            if(house.score <= 21){break;}
            if(house.cards[i][1] == 11){
                house.cards[i][1] = 1;
                house.score -= 10;
            }
        }
        house.showCards(house.cardCount, house.name);
        player.showCards(player.cardCount, player.name);
        if(house.score > 21){
            house.bust = true;                              // House bust over 21
        } else if(house.score >= 17){
            house.stand = true;                             // House stand if at least 17 and no bust
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
        if(!game.mainMenu()){
            game.play = false;
        } else {
            game.play = true;
        };
    }

}