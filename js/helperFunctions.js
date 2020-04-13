// get random number within a range min-max
function getRandomNo(min, max) {
    const number = Math.random() * (max - min) + min;
    if (Math.random() > 0.5) {
        return number;
    } else {
        return -number;
    }
}

function createSpeedY(speed, speedX) {
    const speedY = Math.sqrt(Math.pow(speed, 2) - Math.pow(speedX, 2));
    if (Math.random() > 0.5) {
        return speedY;
    } else {
        return -speedY;
    }
}

// set to local storage
function setToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// get from local storage
function getFromLocalStorage(key) {
    let score;
    if (localStorage.getItem(key) === null) {
        score = 0;
    } else {
        score = JSON.parse(localStorage.getItem(key));
    }
    return score;
}