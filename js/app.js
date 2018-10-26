document.addEventListener("DOMContentLoaded", function (event) {

    var Game = require('./game.js');

    var newGame = new Game;
    newGame.showFurry();
    newGame.showCoin();
    newGame.startGame();
    document.addEventListener('keydown', function (event) {
        newGame.turnFurry(event);
    });

    document.querySelector('button').addEventListener('click', function (event) {
        window.location.reload();
    });
});


