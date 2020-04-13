// declare config vars and instances
let canvas, ctx, gameOver, player1, player2, ball, wait, newRound, message;
let keysPressed = {};

// handle pad movements via 'keyup' & 'keydown' events
document.addEventListener('keydown', (e) => {
    if (e.key === 'q') {
        gameOver = 'true';
    }
    keysPressed[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', (e) => {
    delete keysPressed[e.key.toLowerCase()];
});

// update ball position
function moveBall() {
    // if the ball hits y axis, update score and start new round
    if (ball.x >= canvas.width - ball.r) {
        updateScore(player1);
        setToLocalStorage('player1', player1.score);
    } else if (ball.x < 0 + ball.r) {
        updateScore(player2);
        setToLocalStorage('player2', player2.score);
        // if the ball hits x axis, surface exerts perpendicular force on vy, reverse y
    } else if ((ball.y <= 0 + ball.r) || (ball.y >= canvas.height - ball.r)) {
        ball.speedY = -(ball.speedY);
        // if the ball hit pads, vx bumped into obstacle, thus reverse x  
    } else if (((ball.x + ball.r >= 765)
            // ball musn't go behind the pad
            &&
            (ball.x + ball.r < 765 + ball.speed) &&
            (ball.y >= player2.y) &&
            (ball.y <= player2.y + player2.padHeight)) ||
        ((ball.x - ball.r <= 25)
            // ball musn't go behind the pad
            &&
            (ball.x - ball.r > 25 - ball.speed) &&
            (ball.y >= player1.y) &&
            (ball.y <= player1.y + player1.padHeight))) {
        ball.speedX = -(ball.speedX);
    }
    // move ball at a constant speed
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    ball.drawCircle();
}

// update player's score and reload page
function updateScore(player) {
    player.score++;
    ctx.fillStyle = "#FF0000";
    newRound = 'true';
    location.reload();
}

// (re-)draw canvas
function redraw() {
    // wipes the canvas context 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // (re-)draws pads at the appropriate location
    player1.drawRect();
    player2.drawRect();

    // (re-)draws score
    player1.drawScore(-50);
    player2.drawScore(50);

    // if waiting time is over, (re-)draws ball
    if (wait == false) {
        moveBall();
    } else {
        ball.drawCircle();
    }
    // show outcome at the end of game
    if (message !== undefined) {
        displayOutcome();
    }
}

// players' pad movements
function move() {
    if (keysPressed['w']) {
        player1.moveUp();
    }
    if (keysPressed['s']) {
        player1.moveDown();
    }
    if (keysPressed['arrowup']) {
        player2.moveUp();
    }
    if (keysPressed['arrowdown']) {
        player2.moveDown();
    }
}

// determine winner and end game
function findWinner(player1, player2) {
    if (player1 === 10 || player2 === 10) {
        if (player1 > player2) {
            message = 'Player 1 wins!';
        } else if (player2 > player1) {
            message = 'Player 2 wins!';
        } else {
            message = 'It\'s a tie!';
        }
        player1.score = 0;
        player2.score = 0;
        localStorage.clear();
        gameOver = 'true';
    }
}

// display outcome
function displayOutcome() {
    ctx.fillText(message, canvas.width / 2 - 78, 150);
}