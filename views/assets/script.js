// get canvas element
const canvas = document.querySelector('#game-canvas');

const ctx = canvas.getContext('2d');

// set canvas width and height
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// ball position
let ballPosX = (window.innerWidth / 2) - 45;
let ballPosY = (window.innerHeight / 2) - 60;

// paddle info
const paddleWidth = 20;
const paddleHeight = 120;
let playerPaddleY = (window.innerHeight - paddleHeight) / 2;
let opponentPaddleY = ballPosY;

// ball angle and direction
let direction = {};

const getBallDirection = () => {
    let ballAngle = Math.random() * (2 * Math.PI);

    direction = {
        x: Math.sin(ballAngle),
        y: Math.cos(ballAngle)
    };

    // if ball will be moving straight up or down, reroll direction
    if (ballAngle <= 1 || ballAngle === Math.PI || ballAngle >= 6) {
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

// draw ball
const drawBall = () => {
    ctx.drawImage(ballImg, ballPosX, ballPosY, 45, 65);
};

// draw the paddles
const drawPlayerPaddle = () => {
    ctx.beginPath();
    ctx.rect(0, playerPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = 'maroon';
    ctx.fill();
    ctx.closePath();
};

const drawOpponentPaddle = () => {
    ctx.beginPath();
    ctx.rect(window.innerWidth - paddleWidth, opponentPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = 'maroon';
    ctx.fill();
    ctx.closePath();
};

// main game loop; currently runs  on image load
const main = () => {
    setInterval(() => {
        // clear previous frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw assets
        drawBall();
        drawPlayerPaddle();
        drawOpponentPaddle();

        // set ball's next position
        ballPosX += direction.x * ballDX;
        ballPosY += direction.y * ballDY;

        // set opponent paddle's next position
        opponentPaddleY = ballPosY;

        // wall colision detection
        if (ballPosX < 0 || ballPosX > window.innerWidth - 45) {
            ballDX = -ballDX;
        };

        if (ballPosY < 0 || ballPosY > window.innerHeight - 60) {
            ballDY = -ballDY;
        };
    }, 10);
};

