// Github: https://github.com/Melgar72/OO-Design-Homework/tree/main/project3

// Create an interface that has simulateGame()
// All game classes will implement this

interface simulation{
    // Run the game and return winning gamblers
    simulateGame(): Gambler[];
    profitMultiplier(_gambler: Gambler): number;
}

// Create a class for the non-abstract portions
// of the Game class. 
// - name, playGame, etc.
class Game {
    private _name: string;
    private _book: Map< Gambler, number >; 
    private _casino: Casino;

    public get name(): string { return this._name }

    constructor( name: string, casino: Casino ) {
        this._name = name;
        this._book = new Map();
        this._casino = casino;
    }

    protected profitMultiplier( _gambler: Gambler ): number { return 2; }

    public playGame(): void {
        console.log( "playing", this.name, "with book:" );
        for( let [player, bet] of this._book ) {
            console.log( "  ", player.name, ": $", bet );
        }

        const winners = this.simulateGame();

        console.log( "game finished!" );

        // For each winner, calculate how much money they won and give it to
        // them. Deduct that much money from the casino.
        for( let winner of winners ) {
            const bet = this._book.get( winner )!;
            const winnings = Math.round(bet * this.profitMultiplier( winner ) * 100) / 100;
            winner.addMoney( winnings );
            this._casino.addProfit( -winnings );
            console.log( 
                " ", winner.name, "is a winner! they won: ", winnings );

            // remove winners from the book so that only losers will remain.
            this._book.delete( winner );
        }

        // For each loser, take their money and give it to the casino.
        for( let [loser, bet] of this._book ) {
            console.log( " ", loser.name, "has lost!" );
            loser.addMoney( -bet ); // subtract money from losers;
            casino.addProfit( bet ); // give it to the casino
            this._book.delete( loser );
        }
    }

    public addPlayer( g: Gambler, bet: number ): void {
        this._book.set( g, bet );
    }

    public getPlayers(): Gambler[] {
        return Array.from(this._book.keys());
    }
}


// Individual games will take the class of non-abstract 
// portions as a field

// Repeat for Gamblers



class TailsIWin implements simulation {
    private winners : Gambler[];

    private g: Game;

    // Construct game with name and casino for base class
    // Game needs a winners array to return
    constructor(){
        this.winners = [];
        this.g = new Game("Tails I Win", casino);
    }

    // Required method
    simulateGame(): Gambler[] {
        this.winners = [];
        /*
         * flip coin
         * 0->1 , <.5 = tails, >= .5 = heads
         * if you don't win, you lose
         * return winners only
         * no need to mark losers
         */
        if(Math.random() >= .5){
            console.log("coin was heads.");
            for(let player of this.g.getPlayers()){
                // win
                this.winners.push(player);
            }
        } else {
            console.log("coin was tails.");
        }
        return this.winners;
    }

    profitMultiplier(_gambler: Gambler): number {
        return 1.9;
    }
}

function randomInt( upper: number ) {
    // Math.random() goes between 0 and 1, but never hits exactly 1
    return Math.floor( Math.random() * upper );
}

class GuessTheNumber implements simulation {
    private winners : Gambler[];
    private playerNumGuess : number;
    private casinoNumGuess : number;
    private g: Game;

    constructor(){
        this.winners = [];
        this.playerNumGuess = 6; // stand-in value
        this.casinoNumGuess = 6; // stand-in value
        this.g = new Game("Guess the Number", casino);
    }

    simulateGame(): Gambler[] {
        // re-instantiate winners.
        // wasn't updating properly between games without.
        this.winners = [];

        // call randomInt as game is played
        this.casinoNumGuess = randomInt(5);
        console.log("the correct number is : ", this.casinoNumGuess);
        for(let player of this.g.getPlayers()){
            this.playerNumGuess = randomInt(5);
            console.log(player.name, " guessed ", this.playerNumGuess);
            if(this.playerNumGuess == this.casinoNumGuess){
                this.winners.push(player);
            }
        }
        return this.winners;
    }

    // Multiplier in this game is 4.5
    profitMultiplier(_gambler: Gambler): number {
        return 4.5;
    }
}

class OffTrackGuineaPigRacing implements simulation {
    private winners : Gambler[];
    private playerPig : number;
    private winningPig: number;
    private holdRandom: number;
    private g: Game;

    constructor(){
        this.winners = [];
        // removed randomInt from constructor call
        // instead calling inside simulateGame
        // to try and make fresh randoms
        this.playerPig = 4;     // stand-in value
        this.winningPig = 4;    // stand-in value
        this.holdRandom = 0;    // stand-in value
        this.g = new Game("Off Track Guineapig Racing", casino);
    }

    simulateGame(): Gambler[] {
        this.winners = [];  
        this.holdRandom = Math.random();
        // for loop for players
        for(let player of this.g.getPlayers()){
            this.playerPig = randomInt(4);
            console.log(player.name, "bets on #", this.playerPig);

            // random calls, checks percentage to dictate winning pig
            if(this.holdRandom < .5){this.winningPig = 0;}
            else if(this.holdRandom >= .5 && this.holdRandom < .75){this.winningPig = 1;}
            else if(this.holdRandom >= .75 && this.holdRandom < .875){this.winningPig = 2;}
            else if(this.holdRandom >= .875 && this.holdRandom < 1){this.winningPig = 3;}

            // we already have the winning pig decided
            // check if players guessed the winning pig and push winners
            if((this.playerPig == this.winningPig) && this.winningPig == 0){this.winners.push(player);} 
            else if((this.playerPig == this.winningPig) && this.winningPig == 1){this.winners.push(player);}
            else if((this.playerPig == this.winningPig) && (this.winningPig == 2 || this.winningPig == 3)){this.winners.push(player);}
        }
        console.log("the winning pig is: #", this.winningPig);
        return this.winners;
    }

    // various multipliers
    // winning pig and player pig are same 
    // when profitMult is called
    profitMultiplier(_gambler: Gambler): number {
        if(this.playerPig == 0){return 1.9;}
        else if(this.playerPig == 1){return 3.8;}
        else if(this.playerPig == 2){return 7.6;}
        else{return 7.6;} // only other option is pig 3
    }
}


// REPEAT THE PROCESS OF INTERFACES AND CLASSES


abstract class Gambler {
    private _name: string;
    private _money: number;

    /** how much money the gambler is trying to get */
    private _target: number; 

    public constructor( 
        name: string, 
        startingFunds: number, 
        targetFunds: number 
    ) {
        this._name = name;
        this._money = startingFunds;
        this._target = targetFunds;
    }

    // These are properties. 
    // When we create a gambler: const gambler = new Gambler(...);
    // we can write this: console.log( gambler.name )
    // get name(): ... makes it so that when we access gambler.name, 
    // the function { return this._name } gets called. This allows us
    // to read the name inside the gambler. 
    // Getters are public by default, so this is a way of reading a public 
    // variable.
    // However, get can only get a value. It's not able to set values. So
    // name is a read-only property, which is what we want. 
    get name(): string { return this._name }
    get money(): number { return this._money }
    get target(): number { return this._target }

    // setter for addMoney override in streakGambler
    set money(x: number){this._money = x};

    /**
     * Add or deduct a given amount of money to the gambler's bankroll. 
     * @param amount The amount of money to add. Negative means to remove.
     */
    addMoney( amount: number ): void {
        // rounding to avoid to try avoiding insane floats
        this._money += Math.round(amount * 100) / 100;
    }

    /**
     * @returns Whether the gambler has hit their target.
     */
    public hitTarget(): boolean { 
        if(this._money >= this._target){
            return true;
        } else{
            return false;
        }
    }


    /**
     * @returns Whether the gambler has run out of money.
     */
    public bankrupt(): boolean {
        // Weird float math is occuring due to multipliers
        // so we are checking if they have less than
        // a penny. 
        if(this._money <= 0.01){
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * @returns Whether the gambler is finished (i.e., if they've run out
     * of money or have reached their target.)
     */
    public isFinished(): boolean { 
        if(this.hitTarget() || this.bankrupt()){return true;}
        else{return false;}
    }

    /**
     * @returns How much the gambler is going to bet next.
     * Overriden in each subclass
     */
    public abstract getBetSize(): number;
}

/**
 * The stable gambler always bets the same amount as long as they have enough
 * money. If they don't, they bet what they have. Their goal is to double 
 * their starting funds.
 */
class StableGambler extends Gambler {
    private _bet: number; 

    public constructor( 
        name: string, 
        startingFunds: number, 
        stableBet: number
    ) {
        // (Gambler name, their starting funds, their target goal)
        super( name, startingFunds, startingFunds * 2 );
        this._bet = stableBet;
    }

    override getBetSize(): number {
        // if bet size is less than gambler bank, standard bet
        // if bet size is larger than gambler bank, bet remaining money
        // stable bet is minimum bet, and if the minimum bet
        // is greater than the remaining funds, bet remaining funds.
        if(this._bet <= this.money){
            return this._bet;
        } else {
            return this.money;
        }
    }
}

/**
 * The high risk gambler always bets half of their current money. If they have
 * less than yoloAmount, they bet the remainder of their money. Their goal is
 * to make 5 times their starting amount of money. 
 */
class HighRiskGambler extends Gambler {
    /** if the gambler has <= this amount of money, they bet it all. */
    private _yoloAmount: number;

    /**
     * @param yoloAmnt If the gambler has <= this amount of money, they
     * bet everything they have remaining.
     */
    public constructor(
        name: string,
        startingFunds: number, 
        yoloAmnt: number 
    ) {
        super(name, startingFunds, startingFunds * 5);
        this._yoloAmount = yoloAmnt;
    }

    override getBetSize(): number {
        // if this.money <= yolo , bet this.money
        // if this.money > yolo , bet half this.money
        if(this.money <= this._yoloAmount){
            return this.money;
        } else{
            // betting half of remaining money on constant losses
            // will quickly lead to longer floats
            // use math.round to only bet in typical
            // dollar/coin amounts. 
            return Math.round((this.money / 2) * 100) / 100;
        }
    }
}

/**
 * The streak better always increases their bet whenever they win by a 
 * given multiple, and reduces their bet by a given multiple when they lose.
 * For example, if the win multiple is 2.0 and lose multiple is 0.5, the 
 * streak better will double their money when they win and halve it when they
 * lose. You can also do the reverse, making them more conservative when 
 * they win. They start at a given initial bet. 
 * 
 * How do we detect whether we won or lost? Override the addMoney method.
 */
class StreakGambler extends Gambler {
 
    private _firstBet: number;
    private _minBet: number;
    private _winMult: number;
    private _loseMult: number;

    public constructor(
        name: string, 
        startingFunds: number,
        firstBet: number,
        minBet: number,
        winMult: number,
        loseMult: number,
        target: number
    ){
        // setting base info, target is 5x starting funds
        // streak vs high risk
        super(name, startingFunds, target);
        this._firstBet = firstBet;
        this._minBet = minBet;
        this._winMult = winMult;
        this._loseMult = loseMult;
    }

    override getBetSize(): number {
        // if remaining money is less than 
        // preset minimum bet, bet remaining
        if(this.money <= this._minBet){
            return this.money;
        // if current bet (firstBet) is less than
        // the minimum bet, current bet is minBet
        // (caused by loss streak & loss mult)
        }else if(this._firstBet < this._minBet){
            // if firstBet < minBet
            this._firstBet = this._minBet;
            return this._firstBet;
        }else{   
            // multiplier is applied on win/loss
            // taken care of in addMoney
            // only need to return updated bet
            return this._firstBet;
        }
    }

    override addMoney(amount: number): void {
        // still need to add/sub money
        // verify setter works properly
        this.money += Math.round(amount * 100) / 100;

        // change multipliers
        // If lost money, reduce mult, else gain mult
        if(amount < 0){
            this._firstBet *= this._loseMult;
        } else {
            this._firstBet *= this._winMult;
        }
    }
}


class Casino {
    /** a list of games offered in the casino */
    private _games: Game[];      

    /** a set of guests to the casino */
    private _gamblers: Set<Gambler>;

    /** how much money the casino made today */
    private _profits: number; 

    /** the maximum number of rounds to play */
    private _maxRounds: number;
    private _currentRound: number;

    public constructor( maxRounds: number ) {
        this._games = [
            new TailsIWin("Tails I Win", this),
            new GuessTheNumber("Guess the Number", this),
            new OffTrackGuineaPigRacing("Off Track Guineapig Racing", this),
        ];

        this._profits = 0;

        this._gamblers = new Set([
            // Argument 2 is the amount they start with, 
            // Arg 3 is how much they bet
            new StableGambler( "Alice", 100, 15 ),

            // Argument 2 is the amount they start with
            // Arg 3 is how much they start betting
            // the target is to make 5 times their starting balance, but 
            // you don't see that here because it's calculated inside the 
            // constructor instead of being passed as an argument.
            new HighRiskGambler( "Bob", 50, 10 ),

            // Arg 4 is the minimum amount they will bet 
            // Arg 5 is how much they multiply their bet by when they win
            // Arg 6 is how much they multiply their bet by when they lose
            // Arg 7 is their target. How much they want to make. 
            new StreakGambler( "Camille", 200, 10, 10, 2, 0.5, 500 ),
        ]);

        this._maxRounds = maxRounds;
        this._currentRound = 0;
    }

    

    /**
     * Add profit to the casino for the day.
     * @param amount The amount of profit to add. If negative, it counts as a
     * loss.
     */
    public addProfit( amount: number ): void {
        this._profits += amount;
    }

    /** For each game: have each gambler who is still present play.
     * Starts by printing how much money each gambler has. 
     * If a gambler runs out of money or hits their target, they leave.
     * Then, plays the game with all players.
     */
    public simulateOneRound(): void {
        const startingProfit = this._profits;

        console.log( "-----------------------" );
        console.log( "beginning round", this._currentRound );
        for( let game of this._games ) {
            this.determineWhoIsStillPlaying();

            // add each player who is still playing to the game.
            // have them use the bet size determined by their personality.
            for( let player of this._gamblers ) {
                game.addPlayer( player, player.getBetSize() );
            }

            const gameStartingProfit = this._profits;
            game.playGame();
            console.log( 
                "casino made", 
                Math.round((casino._profits - gameStartingProfit) * 100) / 100, "on this game.")
            console.log();
        }
        console.log( 
            "round complete. casino made: ", Math.round((this._profits - startingProfit) * 100) / 100);
        console.log( "total profit:", Math.round(this._profits * 100) / 100);
        console.log( "-----------------------" );
    }

    /**
     * Run the simulation until either the maximum number of games is reached,
     * or no one is left in the casino.
     */
    public simulate(): void {
        while( this._currentRound < this._maxRounds && this._gamblers.size > 0 ) {
            this.simulateOneRound();
            console.log();
            this._currentRound++;
        }

        console.log( "simulation complete" );
    }

    /**
     * Update and list the people who are still playing.
     */
    private determineWhoIsStillPlaying() {
        const gamblersWhoLeft: Gambler[] = [];
        
        // update and list of who is still playing
        for( let gambler of this._gamblers.keys() ) {
            console.log( gambler.name, ": $", gambler.money);
            
            if( gambler.isFinished() ) {
                // add this person to the list of gamblers to remove.
                // don't remove it right away: removing an element from a 
                // collection that we are iterating over is usually a bad
                // idea.
                gamblersWhoLeft.push( gambler );
            }

            // now, print why the person left if they did so
            if( gambler.hitTarget() ) {
                console.log( 
                    gambler.name, 
                    "has hit their target! They leave the casino..."
                );
            }
            else if( gambler.bankrupt() ) {
                console.log( 
                    gambler.name,
                    "has gone bankrupt! They leave the casino..."
                );
            }
        }

        // remove the gamblers who left from the set
        for( let leaver of gamblersWhoLeft ) {
            this._gamblers.delete( leaver );
        }
    }
}

const MAX_N_ROUNDS = 5;

// main:
const casino = new Casino( MAX_N_ROUNDS );

casino.simulate();
