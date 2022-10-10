// get canvas element
const canvas = document.querySelector('#game-canvas');

const ctx = canvas.getContext('2d');

// set canvas width and height
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// is up/down key pressed?
let isUpPressed = false;
let isDownPressed = false;

// ball info
const ballWidth = 45;
const ballHeight = 60;
let ballPosX = (window.innerWidth / 2) - ballWidth;
let ballPosY = (window.innerHeight / 2) - ballHeight;

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
    ctx.drawImage(ballImg, ballPosX, ballPosY, ballWidth, ballHeight);
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

// set next position of the ball
const setBallPosition = () => {
    ballPosX += direction.x * ballDX;
    ballPosY += direction.y * ballDY;
};

// set opponent paddle position
const setOpponentPosition = () => {
    // if ball is in the fourth quarter of the screen...
    if (ballPosX >= (window.innerWidth / 2) + (window.innerWidth / 4)) {
        // ... if ball is above the paddle, move paddle up
        // else if ball is below the paddle, move the paddle down
        if (ballPosY - (ballHeight / 2) > opponentPaddleY) {
            opponentPaddleY += 2;
        } else if (ballPosY - (ballHeight / 2) < opponentPaddleY) {
            opponentPaddleY -= 2;
        };
    };
};

// wall collision detection
const checkWallCollision = () => {
    if (ballPosX < 0 || ballPosX > window.innerWidth - ballWidth) {
        ballDX = -ballDX;
    };

    if (ballPosY < 0 || ballPosY > window.innerHeight - ballHeight) {
        ballDY = -ballDY;
    };
};

// handles player movement from keyboard input
const handlePlayerMovement = () => {
    if (isUpPressed) {
        playerPaddleY = Math.max(playerPaddleY - 2.5, 0 - (paddleHeight / 2));
    } else if (isDownPressed) {
        playerPaddleY = Math.min(playerPaddleY + 2.5, window.innerHeight - (paddleHeight / 2));
    };
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
        setBallPosition();

        // set opponent paddle's next position
        setOpponentPosition();

        // wall collision detection
        checkWallCollision();

        // player paddle movement
        handlePlayerMovement();
    }, 10);
};

// key event handlers
const keyDownHandler = e => {
    if (e.key === 'Up' || e.key === 'ArrowUp') {
        isUpPressed = true;
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
        isDownPressed = true;
    };
};

const keyUpHandler = e => {
    if (e.key === 'Up' || e.key === 'ArrowUp') {
        isUpPressed = false;
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
        isDownPressed = false;
    };
};

// event handlers
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
