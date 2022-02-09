class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./img/fondo.png";
    this.boy = new Boy();
    this.grandMaArr = [new Grandma(150, "../img/grand-ma2.png")];
    this.ballArr = [new Ball(150, "../img/ball.png")];
    this.fiveArr = [];
    this.count =0;
    this.score = 0;
    this.isGameOver = false;
  }

  // *FUNCIONES
  
  //? Función de Score 

  //? El background: Dibujar y limpiar.
  clearBackground = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  drawBackground = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };

  //*SPAWN (BONUS: aleatorio en dos carrilles)

  spawnGrandMa = () => {
    let lastGrandMa = this.grandMaArr[this.grandMaArr.length - 1];
    if (lastGrandMa.x > canvas.width /2) {
      let randomY = Math.floor(Math.random() * 350) + 150; //! ATENTO AL RESPONSIVE MEDIDAS!!!!!
      let newGrandma = new Grandma(randomY);
      this.grandMaArr.push(newGrandma);
    }
    if (this.grandMaArr.length > 10) {
      this.grandMaArr.slice();
    }
  };

  //! Control del spawn de 5five
  spawnFive = (event) => {
    
    if (this.count >= 25) {
      this.fiveArr.push(new Five())
      this.count = 0;
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown") {
      this.count++;
    } 
  };
  


//*move Boy
  boyLimitedMov = () => {
    if (this.boy.x > canvas.width - this.boy.width) {
      this.boy.x = canvas.width - this.boy.width;
    } else if (this.boy.x < 0) {
      this.boy.x = 0;
    } else if (this.boy.y > canvas.height - this.boy.height) {
      this.boy.y = canvas.height - this.boy.height;
    } else if (this.boy.y < canvas.height / 6) {
      this.boy.y = canvas.height / 6;
    }
  };

  //* Colisiones

  collisionBoyGrandMa = (eachGrandMaParam) => {
    if (
      this.boy.x < eachGrandMaParam.x + eachGrandMaParam.width / 2 &&
      this.boy.x + this.boy.width / 2 > eachGrandMaParam.x &&
      this.boy.y < eachGrandMaParam.y + eachGrandMaParam.height / 1.25 &&
      this.boy.height / 1.25 + this.boy.y > eachGrandMaParam.y
    ) {
      this.isGameOver = true;
      canvas.style.display = "none";
      gameOverScreen.style.display = "flex";
    }
  };

  collisionBallBoy = (eachBall, i) => {
    if (
      this.boy.x < eachBall.x + eachBall.width &&
      this.boy.x + this.boy.width > eachBall.x &&
      this.boy.y < eachBall.y + eachBall.height &&
      this.boy.height + this.boy.y > eachBall.y
    ) {
      this.ballArr.splice(this.ballArr[i], 1);

      this.ballArr.push(new Ball(150));
      
      //! implementar el score total
      this.score = this.score + 1
      newScore.innerText = this.score 
    }
  };

  collisionFiveBoy = (eachFive, i) =>{
    if (
      this.boy.x < eachFive.x + eachFive.width &&
      this.boy.x + this.boy.width > eachFive.x &&
      this.boy.y < eachFive.y + eachFive.height &&
      this.boy.height + this.boy.y > eachFive.y
    ){
      this.fiveArr.splice(this.fiveArr[i],1);
     
     //!implementar el score total
      this.score = this.score + 5
      newScore.innerText = this.score 
    }
  }


  //todo :GAMELOOP 

  gameLoop = () => {
    // console.log ("el juego funciona?")

    //limpiar el canvas
    this.clearBackground();

    //MOVIMIENTOS Y ACCIONES
    //todo: Boy
    this.boyLimitedMov();

    //todo: ABUELA
    //* SPAWN
    this.grandMaArr.forEach((eachGrandMa) => {
      eachGrandMa.moveGrandMa();
    });
    this.spawnGrandMa();

    //todo: BALL
    // this.spawnBall();

    //todo: COLISIONES
    this.grandMaArr.forEach((eachGrandMaParam) => {
      this.collisionBoyGrandMa(eachGrandMaParam);
    });

    this.ballArr.forEach((eachBall, i) => {
      this.collisionBallBoy(eachBall, i);
    });

    this.fiveArr.forEach((eachFive)=>{
      this.collisionFiveBoy(eachFive)
    })

    // dibujar elementos

    this.drawBackground();
    this.boy.drawBoy();

    this.grandMaArr.forEach((eachGrandMa) => {
      eachGrandMa.drawGrandMa();
    });

    this.ballArr.forEach((eachBall) => {
      eachBall.drawBall();
    });

    // ESTO SOLO VA A FUNCIONAR CUANDO SCORE TENGA VALOR

    this.fiveArr.forEach((eachFive)=>{
      eachFive.drawFive();
    })

    //this.fiveArr.forEach((eachScore)=>{
    //eachScore.drawScore()
    //})

    // recursion para la animacion

    if (!this.isGameOver) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
