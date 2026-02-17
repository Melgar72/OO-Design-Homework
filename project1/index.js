"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline-sync"));
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
    hit; //  Read from input, (h)
    stand; //  Read from input (s)
    bet;
    money;
    cards;
    score;
    bust;
    cardCount;
    constructor(hit, stand, bet, money, cards, score, bust, cardCount) {
        this.hit = hit;
        this.stand = stand;
        this.bet = bet;
        this.money = money;
        this.cards = cards;
        this.score = score;
        this.bust = bust;
        this.cardCount = cardCount;
    }
}
class Cards {
    hearts;
    spades;
    diamonds;
    clubs;
    // enum h/s/d/c to make .rand pick? 
    constructor(hearts, spades, diamonds, clubs) {
        // Pattern goes Card then Value
        this.hearts = hearts;
        this.spades = spades;
        this.diamonds = diamonds;
        this.clubs = clubs;
    }
    randomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    //  Will need to be modified for removal of cards (play through full deck)
    randomCard(value) {
        //suit = this.randomNum(1, 4);
        value = this.randomNum(1, 13);
        return value; // use to track value, will need to change return type to track suit
    }
}
// TEST / REVISIT
const move = readline.question("(h)it or (s)tay ");
let player = new Player(false, false, 0, 100, [], 0, false, 0);
let house = new Player(false, false, 0, 0, [], 0, false, 0);
let deck = new Cards([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]);
// ***** REMAKE AS GAME CLASS METHODS, CURRENTLY JUST ONE RUNTHROUGH *****
for (let i = 0; i < 1; i++) {
    // First, deal two cards to house and player, alternating between
    /*
        TS was having issues with .cards[] being either number | undefined.
        Providing a default value removes the error at runtime and
        allows implementation of working code.
        
        ******
        RETURN TO THIS SECTION WHEN WORKING ON FIXING SUITS AND
        TRACKING DECK USAGE
        ******

    */
    for (let i = 0; i < 2; i++) {
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
    // Player may hit or stand
    /*

    *****

        REVISIT WHEN READLINE IS FIXED. NEED TO WORK ON ACTUAL INPUT AND
        HOW THE PLAYER WILL INTERACT

    *****

    */
    while (player.score < 18) {
        player.hit = true;
        player.cards.push(deck.randomNum(1, 11));
        player.cardCount++;
        player.score += player.cards[player.cardCount - 1] || 0;
        console.log("House: ", house.cards[0]);
        console.log("Player: ", player.cards, " ", player.score);
        if (player.score > 21) {
            player.bust = true;
        }
        else if (player.score >= 18) {
            player.stand;
        }
    }
    // If player hits, add a card to their card array and increase their score
    // If a player stands or busts, reveal the house hand
    // House hits until minimum of 17
    while (house.score < 17) {
        house.hit = true;
        house.cards.push(deck.randomNum(1, 11));
        house.cardCount++;
        house.score += house.cards[house.cardCount - 1] || 0;
        console.log("House: ", house.cards, " ", house.score);
        console.log("Player: ", player.cards, " ", player.score);
        if (house.score > 21) {
            house.bust = true;
        }
        else if (house.score >= 17) {
            house.stand = true;
        }
    }
    // Set bust bool to true if score for either reaches above 21
    // If score hits 21, automatic stand
}
/*

    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10],
    ['A', 11, '2', 2, '3', 3, '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10, 'J', 10, 'Q', 10, 'K', 10]
*/ 
//# sourceMappingURL=index.js.map