var Furry = require('./furry.js');
var Coin = require('./coin.js');

var Game = function () {
    this.board = document.querySelectorAll("#board>div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry', this.furry.direction);
    };

    this.hideVisibleFurry = function() {
        document.querySelector('.furry').classList.remove('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.moveFurry = function () {
        this.hideVisibleFurry();
        if (this.furry.direction === "right") {
            this.furry.x++;
        } else if (this.furry.direction === "left") {
            this.furry.x--;
        } else if (this.furry.direction === "down") {
            this.furry.y--;
        } else {
            this.furry.y++;
        }
        this.checkCoinCollision();
        this.gameOver();
        this.showFurry();
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                self.furry.direction = "left";
                break;
            case 39:
                self.furry.direction = "right";
                break;
            case 40:
                self.furry.direction = "up";
                break;
            case 38:
                self.furry.direction = "down";
                break;
            default:
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');
            var scoreCounter = document.querySelector('#score div strong');

            this.coin = new Coin();
            this.showCoin();

            this.score++;
            scoreCounter.innerHTML = this.score;
        }
    };

    this.gameOver = function(){
        if(this.furry.x<0 || this.furry.x>9 || this.furry.y<0 || this.furry.y>9){
            clearInterval(this.idSetInterval);
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');

            document.querySelector('#board').classList.add('invisible');
            document.querySelector('#score').classList.add('invisible');
            document.querySelector('#over').classList.remove('invisible');
            var pre = document.createElement('pre');
            document.querySelector('#over').appendChild(pre);
            pre.innerHTML = this.score;
            document.querySelector('#over pre').innerHTML = this.score;
            this.hideVisibleFurry();
        }
    };

    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
};

module.exports = Game;