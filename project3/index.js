// Github: https://github.com/Melgar72/OO-Design-Homework/tree/main/project3
/*
function playGames(c: TailsIWin | GuessTheNumber | OffTrackGuineaPigRacing){

    console.log( "playing", c.name, "with book:" );
        for( let [player, bet] of c.book ) {
            console.log( "  ", player.name, ": $", bet );
        }

        const winners = c.simulateGame();

        console.log( "game finished!" );

        // For each winner, calculate how much money they won and give it to
        // them. Deduct that much money from the casino.
        for( let winner of winners ) {
            const bet = c.book.get( winner )!;
            const winnings = Math.round(bet * c.profitMultiplier( winner ) * 100) / 100;
            winner.addMoney( winnings );
            // this is a getter, not a setter. probs need a setter
            // per typescript docs, there's some "this" errors
            // create new variable that conducts required actions
            // in two steps
            
            
            // c.casino.addProfit( -winnings );
            // TESTING
            // console.log("testing");
            // console.log(c.book);

            console.log(
                " ", winner.name, "is a winner! they won: ", winnings );

            // remove winners from the book so that only losers will remain.
            // probably need a setter as well
            c.book.delete( winner );
        }

        // For each loser, take their money and give it to the casino.
        for( let [loser, bet] of c.book ) {
            console.log( " ", loser.name, "has lost!" );
            loser.addMoney( -bet ); // subtract money from losers;
            casino.addProfit( bet ); // give it to the casino
            // probs need as a setter
            c.book.delete( loser );
        }
}
*/
// Create a class for the non-abstract portions
// of the Game class. 
// - name, playGame, etc.
var Game = /** @class */ (function () {
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
    Object.defineProperty(Game.prototype, "book", {
        get: function () { return this._book; },
        set: function (b) { this._book = b; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "casino", {
        get: function () { return this._casino; },
        enumerable: false,
        configurable: true
    });
    ;
    Game.prototype.addPlayer = function (g, bet) {
        this._book.set(g, bet);
    };
    Game.prototype.getPlayers = function () {
        return Array.from(this._book.keys());
    };
    return Game;
}());
// Individual games will take the class of non-abstract 
// portions as a field
// Repeat for Gamblers
var TailsIWin = /** @class */ (function () {
    // Construct game with name and casino for base class
    // Game needs a winners array to return
    function TailsIWin() {
        this.winners = [];
        this.g = new Game("Tails I Win", casino);
    }
    Object.defineProperty(TailsIWin.prototype, "name", {
        get: function () { return this.g.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TailsIWin.prototype, "book", {
        get: function () { return this.g.book; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TailsIWin.prototype, "casino", {
        get: function () { return this.g.casino; },
        enumerable: false,
        configurable: true
    });
    TailsIWin.prototype.sendAddPlayer = function (gambler, bet) {
        this.g.addPlayer(gambler, bet);
    };
    // Required method
    TailsIWin.prototype.simulateGame = function () {
        this.winners = [];
        /*
         * flip coin
         * 0->1 , <.5 = tails, >= .5 = heads
         * if you don't win, you lose
         * return winners only
         * no need to mark losers
         */
        if (Math.random() >= .5) {
            console.log("coin was heads.");
            for (var _i = 0, _a = this.g.getPlayers(); _i < _a.length; _i++) {
                var player = _a[_i];
                // win
                this.winners.push(player);
            }
        }
        else {
            console.log("coin was tails.");
        }
        return this.winners;
    };
    TailsIWin.prototype.profitMultiplier = function (_gambler) {
        return 1.9;
    };
    return TailsIWin;
}());
function randomInt(upper) {
    // Math.random() goes between 0 and 1, but never hits exactly 1
    return Math.floor(Math.random() * upper);
}
var GuessTheNumber = /** @class */ (function () {
    function GuessTheNumber() {
        this.winners = [];
        this.playerNumGuess = 6; // stand-in value
        this.casinoNumGuess = 6; // stand-in value
        this.g = new Game("Guess the Number", casino);
    }
    Object.defineProperty(GuessTheNumber.prototype, "name", {
        get: function () { return this.g.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GuessTheNumber.prototype, "book", {
        get: function () { return this.g.book; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GuessTheNumber.prototype, "casino", {
        get: function () { return this.g.casino; },
        enumerable: false,
        configurable: true
    });
    GuessTheNumber.prototype.sendAddPlayer = function (gambler, bet) {
        this.g.addPlayer(gambler, bet);
    };
    GuessTheNumber.prototype.simulateGame = function () {
        // re-instantiate winners.
        // wasn't updating properly between games without.
        this.winners = [];
        // call randomInt as game is played
        this.casinoNumGuess = randomInt(5);
        console.log("the correct number is : ", this.casinoNumGuess);
        for (var _i = 0, _a = this.g.getPlayers(); _i < _a.length; _i++) {
            var player = _a[_i];
            this.playerNumGuess = randomInt(5);
            console.log(player.name, " guessed ", this.playerNumGuess);
            if (this.playerNumGuess == this.casinoNumGuess) {
                this.winners.push(player);
            }
        }
        return this.winners;
    };
    // Multiplier in this game is 4.5
    GuessTheNumber.prototype.profitMultiplier = function (_gambler) {
        return 4.5;
    };
    return GuessTheNumber;
}());
var OffTrackGuineaPigRacing = /** @class */ (function () {
    function OffTrackGuineaPigRacing() {
        this.winners = [];
        // removed randomInt from constructor call
        // instead calling inside simulateGame
        // to try and make fresh randoms
        this.playerPig = 4; // stand-in value
        this.winningPig = 4; // stand-in value
        this.holdRandom = 0; // stand-in value
        this.g = new Game("Off Track Guineapig Racing", casino);
    }
    Object.defineProperty(OffTrackGuineaPigRacing.prototype, "name", {
        get: function () { return this.g.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OffTrackGuineaPigRacing.prototype, "book", {
        get: function () { return this.g.book; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OffTrackGuineaPigRacing.prototype, "casino", {
        get: function () { return this.g.casino; },
        enumerable: false,
        configurable: true
    });
    OffTrackGuineaPigRacing.prototype.sendAddPlayer = function (gambler, bet) {
        this.g.addPlayer(gambler, bet);
    };
    OffTrackGuineaPigRacing.prototype.simulateGame = function () {
        this.winners = [];
        this.holdRandom = Math.random();
        // for loop for players
        for (var _i = 0, _a = this.g.getPlayers(); _i < _a.length; _i++) {
            var player = _a[_i];
            this.playerPig = randomInt(4);
            console.log(player.name, "bets on #", this.playerPig);
            // random calls, checks percentage to dictate winning pig
            if (this.holdRandom < .5) {
                this.winningPig = 0;
            }
            else if (this.holdRandom >= .5 && this.holdRandom < .75) {
                this.winningPig = 1;
            }
            else if (this.holdRandom >= .75 && this.holdRandom < .875) {
                this.winningPig = 2;
            }
            else if (this.holdRandom >= .875 && this.holdRandom < 1) {
                this.winningPig = 3;
            }
            // we already have the winning pig decided
            // check if players guessed the winning pig and push winners
            if ((this.playerPig == this.winningPig) && this.winningPig == 0) {
                this.winners.push(player);
            }
            else if ((this.playerPig == this.winningPig) && this.winningPig == 1) {
                this.winners.push(player);
            }
            else if ((this.playerPig == this.winningPig) && (this.winningPig == 2 || this.winningPig == 3)) {
                this.winners.push(player);
            }
        }
        console.log("the winning pig is: #", this.winningPig);
        return this.winners;
    };
    // various multipliers
    // winning pig and player pig are same 
    // when profitMult is called
    OffTrackGuineaPigRacing.prototype.profitMultiplier = function (_gambler) {
        if (this.playerPig == 0) {
            return 1.9;
        }
        else if (this.playerPig == 1) {
            return 3.8;
        }
        else if (this.playerPig == 2) {
            return 7.6;
        }
        else {
            return 7.6;
        } // only other option is pig 3
    };
    return OffTrackGuineaPigRacing;
}());
// Gambler retains non-abstract methods
var Gambler = /** @class */ (function () {
    function Gambler(name, startingFunds, targetFunds) {
        this._name = name;
        this._money = startingFunds;
        this._target = targetFunds;
    }
    Object.defineProperty(Gambler.prototype, "name", {
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gambler.prototype, "money", {
        get: function () { return this._money; },
        set: function (x) { this._money = x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gambler.prototype, "target", {
        get: function () { return this._target; },
        enumerable: false,
        configurable: true
    });
    ;
    Gambler.prototype.addMoney = function (amount) {
        // rounding to avoid to try avoiding insane floats
        this._money += Math.round(amount * 100) / 100;
    };
    Gambler.prototype.hitTarget = function () {
        if (this._money >= this._target) {
            return true;
        }
        else {
            return false;
        }
    };
    Gambler.prototype.bankrupt = function () {
        if (this._money <= 0.01) {
            return true;
        }
        else {
            return false;
        }
    };
    Gambler.prototype.isFinished = function () {
        if (this.hitTarget() || this.bankrupt()) {
            return true;
        }
        else {
            return false;
        }
    };
    return Gambler;
}());
/**
 * The stable gambler always bets the same amount as long as they have enough
 * money. If they don't, they bet what they have. Their goal is to double
 * their starting funds.
 */
var StableGambler = /** @class */ (function () {
    function StableGambler(gambler) {
        this.gambler = gambler;
        this._bet = 15;
    }
    Object.defineProperty(StableGambler.prototype, "name", {
        get: function () { return this.gambler.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StableGambler.prototype, "money", {
        get: function () { return this.gambler.money; },
        set: function (x) { this.gambler.money = x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StableGambler.prototype, "target", {
        get: function () { return this.gambler.target; },
        enumerable: false,
        configurable: true
    });
    ;
    StableGambler.prototype.addMoney = function (amount) {
        // rounding to avoid to try avoiding insane floats
        this.gambler.money += Math.round(amount * 100) / 100;
    };
    StableGambler.prototype.hitTarget = function () {
        if (this.gambler.money >= this.gambler.target) {
            return true;
        }
        else {
            return false;
        }
    };
    StableGambler.prototype.bankrupt = function () {
        if (this.gambler.money <= 0.01) {
            return true;
        }
        else {
            return false;
        }
    };
    StableGambler.prototype.isFinished = function () {
        if (this.hitTarget() || this.bankrupt()) {
            return true;
        }
        else {
            return false;
        }
    };
    StableGambler.prototype.getBetSize = function () {
        // if bet size is less than gambler bank, standard bet
        // if bet size is larger than gambler bank, bet remaining money
        // stable bet is minimum bet, and if the minimum bet
        // is greater than the remaining funds, bet remaining funds.
        if (this._bet <= this.gambler.money) {
            return this._bet;
        }
        else {
            return this.gambler.money;
        }
    };
    return StableGambler;
}());
var HighRiskGambler = /** @class */ (function () {
    /**
     * @param yoloAmnt If the gambler has <= this amount of money, they
     * bet everything they have remaining.
     */
    function HighRiskGambler(gambler, yoloAmnt) {
        this.gambler = gambler;
        this._yoloAmount = yoloAmnt;
    }
    Object.defineProperty(HighRiskGambler.prototype, "name", {
        get: function () { return this.gambler.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HighRiskGambler.prototype, "money", {
        get: function () { return this.gambler.money; },
        set: function (x) { this.gambler.money = x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HighRiskGambler.prototype, "target", {
        get: function () { return this.gambler.target; },
        enumerable: false,
        configurable: true
    });
    ;
    HighRiskGambler.prototype.addMoney = function (amount) {
        // rounding to avoid to try avoiding insane floats
        this.gambler.money += Math.round(amount * 100) / 100;
    };
    HighRiskGambler.prototype.hitTarget = function () {
        if (this.gambler.money >= this.gambler.target) {
            return true;
        }
        else {
            return false;
        }
    };
    HighRiskGambler.prototype.bankrupt = function () {
        if (this.gambler.money <= 0.01) {
            return true;
        }
        else {
            return false;
        }
    };
    HighRiskGambler.prototype.isFinished = function () {
        if (this.hitTarget() || this.bankrupt()) {
            return true;
        }
        else {
            return false;
        }
    };
    HighRiskGambler.prototype.getBetSize = function () {
        // if this.money <= yolo , bet this.money
        // if this.money > yolo , bet half this.money
        if (this.gambler.money <= this._yoloAmount) {
            return this.gambler.money;
        }
        else {
            // betting half of remaining money on constant losses
            // will quickly lead to longer floats
            // use math.round to only bet in typical
            // dollar/coin amounts. 
            return Math.round((this.gambler.money / 2) * 100) / 100;
        }
    };
    return HighRiskGambler;
}());
var StreakGambler = /** @class */ (function () {
    function StreakGambler(gambler, firstBet, minBet, winMult, loseMult) {
        // setting base info, target is 5x starting funds
        // streak vs high risk
        this.gambler = gambler;
        this._firstBet = firstBet;
        this._minBet = minBet;
        this._winMult = winMult;
        this._loseMult = loseMult;
    }
    Object.defineProperty(StreakGambler.prototype, "name", {
        get: function () { return this.gambler.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreakGambler.prototype, "money", {
        get: function () { return this.gambler.money; },
        set: function (x) { this.gambler.money = x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreakGambler.prototype, "target", {
        get: function () { return this.gambler.target; },
        enumerable: false,
        configurable: true
    });
    ;
    StreakGambler.prototype.hitTarget = function () {
        if (this.gambler.money >= this.gambler.target) {
            return true;
        }
        else {
            return false;
        }
    };
    StreakGambler.prototype.bankrupt = function () {
        if (this.gambler.money <= 0.01) {
            return true;
        }
        else {
            return false;
        }
    };
    StreakGambler.prototype.isFinished = function () {
        if (this.hitTarget() || this.bankrupt()) {
            return true;
        }
        else {
            return false;
        }
    };
    StreakGambler.prototype.getBetSize = function () {
        // if remaining money is less than 
        // preset minimum bet, bet remaining
        if (this.gambler.money <= this._minBet) {
            return this.gambler.money;
            // if current bet (firstBet) is less than
            // the minimum bet, current bet is minBet
            // (caused by loss streak & loss mult)
        }
        else if (this._firstBet < this._minBet) {
            // if firstBet < minBet
            this._firstBet = this._minBet;
            return this._firstBet;
        }
        else {
            // multiplier is applied on win/loss
            // taken care of in addMoney
            // only need to return updated bet
            return this._firstBet;
        }
    };
    StreakGambler.prototype.addMoney = function (amount) {
        // still need to add/sub money
        // verify setter works properly
        this.gambler.money += Math.round(amount * 100) / 100;
        // change multipliers
        // If lost money, reduce mult, else gain mult
        if (amount < 0) {
            this._firstBet *= this._loseMult;
        }
        else {
            this._firstBet *= this._winMult;
        }
    };
    return StreakGambler;
}());
var Casino = /** @class */ (function () {
    function Casino(maxRounds) {
        var _this = this;
        /**
         * Add profit to the casino for the day.
         * @param amount The amount of profit to add. If negative, it counts as a
         * loss.
         */
        this.addProfit = function (amount) {
            _this._profits += amount;
        };
        this._games = [
            new TailsIWin(),
            new GuessTheNumber(),
            new OffTrackGuineaPigRacing(),
        ];
        this._profits = 0;
        this._gamblers = new Set([
            // Argument 2 is the amount they start with, 
            // Arg 3 is how much they bet
            new StableGambler(new Gambler("Alice", 100, 15)),
            // Argument 2 is the amount they start with
            // Arg 3 is how much they start betting
            // the target is to make 5 times their starting balance, but 
            // you don't see that here because it's calculated inside the 
            // constructor instead of being passed as an argument.
            new HighRiskGambler(new Gambler("Bob", 50, 250), 10),
            // Arg 4 is the minimum amount they will bet 
            // Arg 5 is how much they multiply their bet by when they win
            // Arg 6 is how much they multiply their bet by when they lose
            // Arg 7 is their target. How much they want to make. 
            new StreakGambler(new Gambler("Camille", 200, 500), 10, 10, 2, 0.5)
        ]);
        this._maxRounds = maxRounds;
        this._currentRound = 0;
    }
    // TESTING
    Casino.prototype.playGames = function (c) {
        console.log("playing", c.name, "with book:");
        // console.log("testing playGames");
        // console.log(c.book);
        for (var _i = 0, _a = Array.from(this._gamblers); _i < _a.length; _i++) {
            var iterator = _a[_i];
            console.log(" ", iterator.name, ": $", iterator.getBetSize());
        }
        // for( let [player, bet] of c.book ) {
        //     console.log( "  ", player.name, ": $", bet );
        // }
        var winners = c.simulateGame();
        console.log("game finished!");
        // For each winner, calculate how much money they won and give it to
        // them. Deduct that much money from the casino.
        for (var _b = 0, winners_1 = winners; _b < winners_1.length; _b++) {
            var winner = winners_1[_b];
            var bet = c.book.get(winner);
            var winnings = Math.round(bet * c.profitMultiplier(winner) * 100) / 100;
            winner.addMoney(winnings);
            console.log(" ", winner.name, "is a winner! they won: ", winnings);
            // remove winners from the book so that only losers will remain.
            // probably need a setter as well
            c.book.delete(winner);
        }
        // For each loser, take their money and give it to the casino.
        // for( let [loser, bet] of c.book ) {
        //     console.log( " ", loser.name, "has lost!" );
        //     loser.addMoney( -bet ); // subtract money from losers;
        //     casino.addProfit( bet ); // give it to the casino
        //     // probs need as a setter
        //     c.book.delete( loser );
        // }
        for (var _c = 0, _d = this._gamblers; _c < _d.length; _c++) {
            var iterator = _d[_c];
            console.log(" ", iterator.name, "has lost!");
            iterator.addMoney(-iterator.getBetSize()); // subtract money from losers;
            casino.addProfit(iterator.getBetSize()); // give it to the casino
            // probs need as a setter
            c.book.delete(iterator);
        }
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
            // let _mainGame = new Game(game.name, game.casino);
            // add each player who is still playing to the game.
            // have them use the bet size determined by their personality.
            for (var _b = 0, _c = Array.from(this._gamblers); _b < _c.length; _b++) {
                var player = _c[_b];
                // _mainGame.addPlayer( player, player.getBetSize() );
                game.sendAddPlayer(player, player.getBetSize());
            }
            var gameStartingProfit = this._profits;
            this.playGames(game);
            console.log("casino made", Math.round((casino._profits - gameStartingProfit) * 100) / 100, "on this game.");
            console.log();
        }
        console.log("round complete. casino made: ", Math.round((this._profits - startingProfit) * 100) / 100);
        console.log("total profit:", Math.round(this._profits * 100) / 100);
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
            console.log(gambler.name, ": $", gambler.money);
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
    Casino.prototype.test = function () {
        console.log("this prints");
        for (var _i = 0, _a = Array.from(this._gamblers); _i < _a.length; _i++) {
            var iterator = _a[_i];
            console.log(iterator);
        }
    };
    return Casino;
}());
var MAX_N_ROUNDS = 5;
// main:
var casino = new Casino(MAX_N_ROUNDS);
// casino.simulate();
casino.simulate();
