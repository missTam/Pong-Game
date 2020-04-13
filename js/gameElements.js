class Player {
    // x, y coordinates of pads, pads' dimensions and score
    constructor(x) {
        this.x = x;
        this.y = 255;
        this.padWidth = 15;
        this.padHeight = 90;
        this.score = 0;
    }

    // move the pad up by 8px
    moveUp() {
        if (this.y > 12) {
            this.y -= 8;
        }
    }

    // move the pad down by 8px
    moveDown() {
        if (this.y < 503) {
            this.y += 8;
        }
    }

    // draw pad
    drawRect() {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.padWidth, this.padHeight);
    }

    // draw score
    drawScore(adjust) {
        ctx.fillText(this.score, canvas.width / 2 + adjust, 50);
    }
}

class Ball {
    constructor() {
        // radius
        this.r = 12;
        // circle center
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        // set speed v, this is a constant
        this.speed = 6;
        // decompose speed vector to v1 and v2
        // define v1 up to v as the max possible value
        this.speedX = getRandomNo(this.speed / 2, this.speed);
        // get v2, knowing that squared values of v1 and v2 are squared v 
        this.speedY = createSpeedY(this.speed, this.speedX);
    }

    drawCircle() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }
}