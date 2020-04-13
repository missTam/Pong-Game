// wait for the HTML to load
document.addEventListener('DOMContentLoaded', init);

// setup config vars 
function init() {
    canvas = document.getElementById('gameCanvas');
    // get the painting toolkit for 2d context
    ctx = canvas.getContext('2d');
    // set color to white
    ctx.fillStyle = "#FFFFFF";
    // set font style
    ctx.font = "30px Arial";

    // init players & ball
    player1 = new Player(10);
    player2 = new Player(775);
    ball = new Ball();

    // get scores from local storage
    player1.score = getFromLocalStorage('player1');
    player2.score = getFromLocalStorage('player2');

    // check if the game should end
    findWinner(player1.score, player2.score);

    // wait 2.5 sec before throwing ball
    setTimeout(() => {
        wait = false;
    }, 2500);

    // play
    playGame();
}

// game play
function play() {
    move();
    redraw();
}

// Loops constantly until game over
function playGame() {
    play();
    // Keep looping
    if (gameOver == undefined && newRound == undefined) {
        requestAnimationFrame(playGame);
    }
}