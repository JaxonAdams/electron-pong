// get canvas element
const canvas = document.querySelector('#game-canvas');

const ctx = canvas.getContext('2d');

// set canvas width and height
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// ball position
let ballPosX = (window.innerWidth / 2) - 45;
let ballPosY = (window.innerHeight / 2) - 60;

// ball angle and direction
let direction = {};

const getBallDirection = () => {
    let ballAngle = Math.random() * (2 * Math.PI);

    console.log(ballAngle);

    direction = {
        x: Math.sin(ballAngle),
        y: Math.cos(ballAngle)
    };

    if (ballAngle <= 1 || ballAngle === 3 || ballAngle >= 6) {
        getBallDirection();
    };
};

// set ball direction
getBallDirection();

let ballDX = 1.7;
let ballDY = 1.7;

// ball image
const ballImg = new Image();
ballImg.addEventListener('load', () => {
    // game will run once image loads in
    main();
}, false);
ballImg.src = './assets/images/paige.png';

const main = () => {
    setInterval(() => {
        // clear previous frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw assets
        drawBall();

        // set ball's next position
        ballPosX += direction.x * ballDX;
        ballPosY += direction.y * ballDY;

        // wall colision detection
        if (ballPosX < 0 || ballPosX > window.innerWidth - 45) {
            ballDX = -ballDX;
        };

        if (ballPosY < 0 || ballPosY > window.innerHeight - 60) {
            ballDY = -ballDY;
        };
    }, 10);
};

// draw ball
const drawBall = () => {
    ctx.drawImage(ballImg, ballPosX, ballPosY, 45, 65);
};