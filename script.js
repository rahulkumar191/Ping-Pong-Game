let board = document.querySelector(".board");
let rod1 = document.querySelector(".rod1");
let rod2 = document.querySelector(".rod2");
let ball = document.querySelector(".ball");

let boardWidth = board.clientWidth;
let boardHeight = board.clientHeight;

let rodX; //left distance of both rods from board
let ballX, ballY; //left and top distacne of ball from board

let rodStepX = 20; //rod speed 
let ballStepX = 1; //ball speed horizontal
let ballStepY = 1; //ball speed vertical

let rod1Score = 0; //rod 1 score 
let rod2Score = 0; //rod 2 score

let gameOn = false; //game on/off status
let gameOver = false; //game over status
let ballTop = true; // ball positon will be top or bottom 

// function for reset game 
function resetGame() {
    gameOn = false;
    gameOver = false;
    
    rod1Score = 0;
    rod2Score = 0; 

    rodX = boardWidth / 2 - rod1.clientWidth / 2;
    ballX = boardWidth / 2 - ball.clientWidth / 2;

    // getting ball y position
    if(ballTop){
        ballY = rod1.clientHeight;
        // rod1Score = 1; //starting score
    }else{
        ballY = boardHeight - rod1.clientHeight - ball.clientHeight;
        // rod2Score = 1; //starting score
    }

    rod1.style.left = rodX + "px";
    rod2.style.left = rodX + "px";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    if(ballStepX > 0) ballStepX = 1;
    else ballStepX = -1;
    ballStepY = 1;

    rodStepX = 20;
}

//function for asking level of game 
function askLevel(){
    let level=prompt('Enter Game Level');
    level=Number(level);

    //level making logic
    if(level && Number.isInteger(level)){
        ballStepX *= level/2;
        ballStepY *= level/2;
        rodStepX += (ballStepY * 5); // rod speed acording to game level
    }
}

// score conting function 
function scoreCount(){
    if(rodX + rod1.clientWidth >= ballX && ballX >= rodX){
        if (ballY <= rod1.clientHeight) rod1Score++;
        else rod2Score++;
    }
    else{
        gameOver = true;
    }
}

// function for moving the ball 
function moveBall() {

    //   stop moving ball when game over 
    let interval = setInterval(function () {
        if (gameOver) {
            clearInterval(interval);
            alert("Rod-1 Score : " + rod1Score + " and " + "Rod-2 Score : " + rod2Score);
            resetGame();
        }

        // calculating ball direction 
        if (ballX >= boardWidth - ball.clientWidth) {
            ballStepX *= -1;

            //ball animation
            ball.className += " " + "scale-height";
            setTimeout(()=>ball.classList.remove("scale-height"),500);
        }
        else if (ballX <= 0) {
            ballStepX *= -1;

            //ball animation
            ball.className += " " + "scale-height";
            setTimeout(()=>ball.classList.remove("scale-height"),500);
        }
        else if (ballY >= boardHeight - rod2.clientHeight - ball.clientHeight) {
            if(ballStepY > 0) ballStepY *=-1; 
            ballTop = false;
            scoreCount();

            //ball animation
            ball.className += " " + "scale-width";
            setTimeout(()=>ball.classList.remove("scale-width"),500);
        }
        else if (ballY <= rod1.clientHeight) {
            if(ballStepY < 0) ballStepY *= -1;
            ballTop = true;
            scoreCount();

            //ball animation
            ball.className += " " + "scale-width";
            setTimeout(()=>ball.classList.remove("scale-width"),500);
        }

        // ball position calculating  
        ballX += ballStepX;
        ballY += ballStepY;

        // updateing ball style
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

    },1);
}


//##### logic implementation start from here #####
resetGame();

// keypress event handling (rod move and start game or Game play)
window.addEventListener("keypress", function (event) {
    if(gameOn){
        if (event.code == "KeyA" && rodX > 0) {
            rodX -= rodStepX;
            if(rodX < 0) rodX = 0;
            rod1.style.left = rodX + "px";
            rod2.style.left = rodX + "px";
        }
    
        if (event.code == "KeyD" && rodX < boardWidth - rod1.clientWidth) {
            rodX += rodStepX;
            if(rodX > boardWidth - rod1.clientWidth) rodX = boardWidth - rod1.clientWidth; 
            rod1.style.left = rodX + "px";
            rod2.style.left = rodX + "px";
        }
    }

    if (event.code == "Enter") {
        if (!gameOn) {
            askLevel();
            moveBall();
            gameOn = true;
        }
    }
});


console.log('Done');
