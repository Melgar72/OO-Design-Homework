var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// this is an abstract class, meaning, we cannot write "new Game(...)".
// this is because the class is missing the "simluateGame" method. 
// that method is declared "abstract", meaning "our child classes will have to 
// fill in what it does". 
/** Represents a casino game. */
var Game = /** @class */ (function () {
    // to construct a game, you have to give it a name
    /** Construct a casino game with the given name, belonging to the
     * given casino.
     */
    function Game(name, casino) {
        this._name = name;
        this._book = new Map();
        this._casino = casino;
    }
    Object.defineProperty(Game.prototype, "name", {
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    // the child class will figure out which gamblers won and return them.
    // this method is abstract: it has no definition. It's up to the child
    // classes to decide what it does. 
    /**
     * This method tells us how much money a particular person will win.
     * By default, we just return 2x the bet. However, in some games,
     * how much we return depends on how the gambler bet. Note that none
     * of the games actually double the player's money, so you might want
     * to pick a different value here.
     * @returns How much to multiply the winnings by
     */
    Game.prototype.profitMultiplier = function (_gambler) { return 2; };
    // this method is *not* abstract, but it calls an abstract method.
    // yes: non-abstract methods can call abstract methods in the same class.
    /** Play the game and give the winners their moeney.
     * Prints all the winners. Removes all elements of this.book.
     * Updates the casino's profits and losses.
     */
    Game.prototype.playGame = function () {
        console.log("playing", this.name, "with book:");
        for (var _i = 0, _a = this._book; _i < _a.length; _i++) {
            var _b = _a[_i], player = _b[0], bet = _b[1];
            console.log("  ", player.name, ": $", bet);
        }
        var winners = this.simulateGame();
        console.log("game finished!");
        // For each winner, calculate how much money they won and give it to
        // them. Deduct that much money from the casino.
        for (var _c = 0, winners_1 = winners; _c < winners_1.length; _c++) {
            var winner = winners_1[_c];
            var bet = this._book.get(winner);
            var winnings = bet * this.profitMultiplier(winner);
            winner.addMoney(winnings);
            this._casino.addProfit(-winnings);
            console.log(" ", winner.name, "is a winner! they won: ", winnings);
            // remove winners from the book so that only losers will remain.
            this._book.delete(winner);
        }
        // For each loser, take their money and give it to the casino.
        for (var _d = 0, _e = this._book; _d < _e.length; _d++) {
            var _f = _e[_d], loser = _f[0], bet = _f[1];
            console.log(" ", loser.name, "has lost!");
            loser.addMoney(-bet); // subtract money from losers;
            casino.addProfit(bet); // give it to the casino
            // also remove losers. the book will be empty after calling 
            // playGame
            // Note: it might be nice to make a functional version of 
            // this where the book is an argument to the method
            // IRL I think this design would be
            // nicer, but it will be more obvious why when you take 
            // programming language design and learn about functional 
            // programming.
            this._book.delete(loser);
        }
    };
    // this function is *not* abstract. We are filling in it's code right now.
    // the child classes will not override this method. It will do the same
    // thing on each child class, so they do not provide their own version of.
    /**
     * Add a player to the game.
     * @param g The gambler to add to the game.
     * @param bet The amount they are betting.
     */
    Game.prototype.addPlayer = function (g, bet) {
        this._book.set(g, bet);
        // you might wonder why we need a method for this? aren't we just
        // doing one line of code? yes, and many programmers will choose to 
        // avoid this function. one reason to have the function, however, is  
        // that it makes it easier to do more stuff when we add a player 
        // (i.e., logging it to a file somewhere). However, this flexibility
        // comes at the cost of a little bit of complexity. 
    };
    /** Returns a list of people playing the game. */
    Game.prototype.getPlayers = function () {
        // this.book.keys() returns an iterator, which is an object that 
        // allows us to scan over a collection using a for loop. We use
        // Array.from(...) to scan over the iterator and add its elements
        // into an array.
        return Array.from(this._book.keys());
    };
    return Game;
}());
/** This is a game where the players all place their bets at the same
 * time. The dealer will flip a coin. If the coin is heads, the players
 * win and their money is doubled. Otherwise, the players lose their bets. */
var TailsIWin = /** @class */ (function (_super) {
    __extends(TailsIWin, _super);
    function TailsIWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // You need to add a constructor. What should go in it?
    // try commenting out this method and see what error you get.
    // why do you get that error?
    TailsIWin.prototype.simulateGame = function () {
        throw new Error("YOUR CODE HERE");
    };
    return TailsIWin;
}(Game));
/**
 * Helper function to generate uniform random numbers between [0, upper).
 * So randomInt( 5 ) generates a number between 0 and 4.
 * @param upper The exclusive upper bound (i.e., the number generated will be
 * at most one less than this number)
 * @returns A randum number in the range [0, upper)
 */
function randomInt(upper) {
    // Math.random() goes between 0 and 1, but never hits exactly 1
    return Math.floor(Math.random() * upper);
}
/// This is a game where each player randomly picks a number from 0 to 4.
/// If the dealer  
/**
 * This is a game where each player randomly picks a number from 0 to 4
 * (inclusive). The dealer also picks a number from 0 to 4. If a player
 * picks the same number as the dealer, they get back 4.5x their bet.
 * (total profit of 3.5x). Otherwise, they lose their money.
 */
var GuessTheNumber = /** @class */ (function (_super) {
    __extends(GuessTheNumber, _super);
    function GuessTheNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GuessTheNumber;
}(Game));
/**
 * Simulated guinea-pig racing. Players choose a pig from 0 to 3.
 * Pig #0 has a 50% chance of winning, and pays out 1.9 if they win.
 * Pig #1 has a 25% chance of winning, and pays out 3.8 if they win.
 * Pig #2 has a 12.5% chance of winning, and pays out 7.6 if they win.
 * Pig #3 has a 12.5% chance of winning, and pays out 7.6 if they win.
 *
 * There are no complicated horse-racing-style bets (e.g., place, show, etc.),
 * each player just picks a pig.
 */
var OffTrackGuineaPigRacing = /** @class */ (function (_super) {
    __extends(OffTrackGuineaPigRacing, _super);
    function OffTrackGuineaPigRacing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OffTrackGuineaPigRacing;
}(Game));
var Gambler = /** @class */ (function () {
    function Gambler(name, startingFunds, targetFunds) {
        throw new Error("YOUR CODE HERE");
    }
    Object.defineProperty(Gambler.prototype, "name", {
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
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gambler.prototype, "money", {
        get: function () { return this._money; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gambler.prototype, "target", {
        get: function () { return this._target; },
        enumerable: false,
        configurable: true
    });
    /**
     * Add or deduct a given amount of money to the gambler's bankroll.
     * @param amount The amount of money to add. Negative means to remove.
     */
    Gambler.prototype.addMoney = function (amount) {
        throw new Error("YOUR CODE HERE");
    };
    /**
     * @returns Whether the gambler has hit their target.
     */
    Gambler.prototype.hitTarget = function () { throw new Error("YOUR CODE HERE"); };
    /**
     * @returns Whether the gambler has run out of money.
     */
    Gambler.prototype.bankrupt = function () { throw new Error("YOUR CODE HERE"); };
    /**
     * @returns Whether the gambler is finished (i.e., if they've run out
     * of money or have reached their target.)
     */
    Gambler.prototype.isFinished = function () {
        throw new Error("YOUR CODE HERE");
    };
    return Gambler;
}());
/**
 * The stable gambler always bets the same amount as long as they have enough
 * money. If they don't, they bet what they have. Their goal is to double
 * their starting funds.
 */
var StableGambler = /** @class */ (function (_super) {
    __extends(StableGambler, _super);
    function StableGambler(name, startingFunds, stableBet) {
        var _this = _super.call(this, name, startingFunds, startingFunds * 2) || this;
        _this._bet = stableBet;
        return _this;
    }
    StableGambler.prototype.getBetSize = function () {
        throw new Error("YOUR CODE HERE");
    };
    return StableGambler;
}(Gambler));
/**
 * The high risk gambler always bets half of their current money. If they have
 * less than yoloAmount, they bet the remainder of their money. Their goal is
 * to make 5 times their starting amount of money.
 */
var HighRiskGambler = /** @class */ (function (_super) {
    __extends(HighRiskGambler, _super);
    /**
     * @param yoloAmnt If the gambler has <= this amount of money, they
     * bet everything they have remaining.
     */
    function HighRiskGambler(name, startingFunds, yoloAmnt) {
        var _this = this;
        throw new Error("YOUR CODE HERE");
        return _this;
    }
    return HighRiskGambler;
}(Gambler));
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
var StreakGambler = /** @class */ (function (_super) {
    __extends(StreakGambler, _super);
    function StreakGambler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StreakGambler;
}(Gambler));
var Casino = /** @class */ (function () {
    function Casino(maxRounds) {
        this._games = [
            new TailsIWin(this),
            new GuessTheNumber(this),
            new OffTrackGuineaPigRacing(this),
        ];
        this._profits = 0;
        this._gamblers = new Set([
            // Argument 2 is the amount they start with, 
            // Arg 3 is how much they bet
            new StableGambler("Alice", 100, 15),
            // Argument 2 is the amount they start with
            // Arg 3 is how much they start betting
            // the target is to make 5 times their starting balance, but 
            // you don't see that here because it's calculated inside the 
            // constructor instead of being passed as an argument.
            new HighRiskGambler("Bob", 50, 10),
            // Arg 4 is the minimum amount they will bet 
            // Arg 5 is how much they multiply their bet by when they win
            // Arg 6 is how much they multiply their bet by when they lose
            // Arg 7 is their target. How much they want to make. 
            new StreakGambler("Camille", 200, 10, 10, 2, 0.5, 500),
        ]);
        this._maxRounds = maxRounds;
        this._currentRound = 0;
    }
    /**
     * Add profit to the casino for the day.
     * @param amount The amount of profit to add. If negative, it counts as a
     * loss.
     */
    Casino.prototype.addProfit = function (amount) {
        this._profits += amount;
    };
    /** For each game: have each gambler who is still present play.
     * Starts by printing how much money each gambler has.
     * If a gambler runs out of money or hits their target, they leave.
     * Then, plays the game with all players.
     */
    Casino.prototype.simulateOneRound = function () {
        var startingProfit = this._profits;
        console.log("-----------------------");
        console.log("beginning round", this._currentRound);
        for (var _i = 0, _a = this._games; _i < _a.length; _i++) {
            var game = _a[_i];
            this.determineWhoIsStillPlaying();
            // add each player who is still playing to the game.
            // have them use the bet size determined by their personality.
            for (var _b = 0, _c = this._gamblers; _b < _c.length; _b++) {
                var player = _c[_b];
                game.addPlayer(player, player.getBetSize());
            }
            var gameStartingProfit = this._profits;
            game.playGame();
            console.log("casino made", casino._profits - gameStartingProfit, "on this game.");
            console.log();
        }
        console.log("round complete. casino made: ", this._profits - startingProfit);
        console.log("total profit:", this._profits);
        console.log("-----------------------");
    };
    /**
     * Run the simulation until either the maximum number of games is reached,
     * or no one is left in the casino.
     */
    Casino.prototype.simulate = function () {
        while (this._currentRound < this._maxRounds && this._gamblers.size > 0) {
            this.simulateOneRound();
            console.log();
            this._currentRound++;
        }
        console.log("simulation complete");
    };
    /**
     * Update and list the people who are still playing.
     */
    Casino.prototype.determineWhoIsStillPlaying = function () {
        var gamblersWhoLeft = [];
        // update and list of who is still playing
        for (var _i = 0, _a = this._gamblers.keys(); _i < _a.length; _i++) {
            var gambler = _a[_i];
            console.log(gambler.name, ": ", gambler.money);
            if (gambler.isFinished()) {
                // add this person to the list of gamblers to remove.
                // don't remove it right away: removing an element from a 
                // collection that we are iterating over is usually a bad
                // idea.
                gamblersWhoLeft.push(gambler);
            }
            // now, print why the person left if they did so
            if (gambler.hitTarget()) {
                console.log(gambler.name, "has hit their target! They leave the casino...");
            }
            else if (gambler.bankrupt()) {
                console.log(gambler.name, "has gone bankrupt! They leave the casino...");
            }
        }
        // remove the gamblers who left from the set
        for (var _b = 0, gamblersWhoLeft_1 = gamblersWhoLeft; _b < gamblersWhoLeft_1.length; _b++) {
            var leaver = gamblersWhoLeft_1[_b];
            this._gamblers.delete(leaver);
        }
    };
    return Casino;
}());
var MAX_N_ROUNDS = 5;
// main:
var casino = new Casino(MAX_N_ROUNDS);
casino.simulate();
