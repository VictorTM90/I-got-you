//* VARIABLES GLOBALES

let startGameScreen = document.querySelector("#start-game");
let gameOverScreen = document.querySelector("#gameover-screen")

let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")
let newGame; 


//* FUNCTIONS TO MANEGE STATES GAMES    

const startGame = () =>{
    // desaparece screen start
    startGameScreen.style.display = "none";
   // aparece el juego
    canvas.style.display = "flex" ; 
    // se inicia el juego 
    newGame = new Game();
    
    newGame.gameLoop();

}

const reStartGame = () => {
    gameOverScreen.style.display = "none";
    startGameScreen.style.display  = "flex";
}




//* ADD EVENTS LISTENERS
let startButton = document.querySelector("#start-game-btn");
startButton.addEventListener("click", startGame );

document.addEventListener ("keydown", (event)=>{
    // console.log (event.key)
     newGame.boy.moveBoy(event);
    //  newGame.ball.spwanBall(event); 
})

let reStartButton = document.querySelector("#restart-btn"); 
reStartButton.addEventListener("click", reStartGame); 


