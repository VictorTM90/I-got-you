class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./img/fondo.png";

    this.audio = new Audio("./sounds/Inicio.mp3");

    this.boy = new Boy();
    this.grandMaArr = [new Grandma(150)];
    this.zapatillaArr = [];

    this.ballArr = [new Ball(150)];
    this.fiveArr = [];

    this.lifeArr = [new life(20), new life(85), new life(145)];

    this.count = 0;

    this.score = 0;

    this.positionX = 0;
    this.positionY = 0;

    this.isGameOver = false;
  }

  // *FUNCIONES

  //? El background: Dibujar y limpiar.
  clearBackground = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  drawBackground = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };

// Spawn (abuelas, zapatillas, 5 puntos)

  spawnGrandMa = () => {
    let lastGrandMa = this.grandMaArr[this.grandMaArr.length - 1];
    if (lastGrandMa.x > canvas.width / 2) {
      //crea una nueva abuela;

      let newGrandma = new Grandma();

      //! pk no funciona, estoy accediendo a la nueva instancia ??
      this.positionX = newGrandma.x;
      this.positionY = newGrandma.y;

      this.grandMaArr.push(newGrandma);
      this.spawnZapatilla(); // ejecutar la funcion a la vez
    }

    if (this.grandMaArr.length > 10) {
      this.grandMaArr.slice();
    }

    // abuela alternativa => IDEA, PERO DONDE SE EJECUTA ? CÓMO INTERVIENE EN EL LOOP Y CON EL MOVE??

    // if (this.score > 10){
    //   this.grandMaArr.forEach((eachGrandamParam, i)=>{
    //     if (i % 2 === 0){
    //     this.eachGrandamParam.x = canvas.width
    //     this.eachGrandamParam.moveGrandMa(-3)
    //   }
    //   });
    // }
  };
// Función condicionada a la propiedad this.score (puntuación del juego). 
  spawnZapatilla = () => {
    // segun score
    if (this.score > 20) {
      let postParamX = this.positionX + 40;
      let postParamY = this.positionY + 40;
      let newZapatilla = new Zapatilla(postParamX, postParamY);
      this.zapatillaArr.push(newZapatilla);
      newZapatilla.audioZapatilla();
    }
  };

  // spawn de los 5 puntos está condicionado a la cantidad de veces que el jugador teclea las flechas para moverse, se contabilizan en this.count
  spawnFive = (event) => {
    if (this.count >= 25) {
      this.fiveArr.push(new Five());
      this.count = 0;
    } else if (
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      this.count++;
    }
  };

  //*limit move Boy ( límite de movimiento dentro del canvas)
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

  //* Colisiones-----------------------------------------------------------------------------

  // Colisiones que suman puntos: 
  collisionBallBoy = (eachBall, i) => {
    if (
      this.boy.x < eachBall.x + eachBall.width / 2 &&
      this.boy.x + this.boy.width > eachBall.x &&
      this.boy.y < eachBall.y + eachBall.height / 1.2 &&
      this.boy.height / 1.2 + this.boy.y > eachBall.y
    ) {
      this.ballArr.splice(this.ballArr[i], 1);

      this.ballArr.push(new Ball(150));

     

      this.score = this.score + 1;

      yourScoreDOM.innerText = this.score;
    }
  };

  collisionFiveBoy = (eachFive, i) => {
    if (
      this.boy.x < eachFive.x + eachFive.width &&
      this.boy.x + this.boy.width > eachFive.x &&
      this.boy.y < eachFive.y + eachFive.height &&
      this.boy.height + this.boy.y > eachFive.y
    ) {
      this.fiveArr.splice(i, 1);

      eachFive.audioFive();

      
      this.score = this.score + 5;

      yourScoreDOM.innerText = this.score;
    }
  };
  // Colisión y GameOver 
  collisionBoyGrandMa = (eachGrandMaParam) => {
    if (
      this.boy.x < eachGrandMaParam.x + eachGrandMaParam.width / 2 &&
      this.boy.x + this.boy.width / 2 > eachGrandMaParam.x &&
      this.boy.y < eachGrandMaParam.y + eachGrandMaParam.height / 1.3 &&
      this.boy.height / 1.3 + this.boy.y > eachGrandMaParam.y
    ) {
      this.audio.pause();
      this.isGameOver = true;
      canvas.style.display = "none";
      gameOverScreen.style.display = "flex";

      // if (this.score > maxScore) {
      //   maxScore = this.score;
      //   maxScoreDOM.innerTexT = this.score;
      // }
    }
  };
  // Colisión que resta vidas, a la 4 colisión se inicia GameOver
  collisionZapatilla = (eachZapatillaParam, i) => {
    if (
      this.boy.x < eachZapatillaParam.x + eachZapatillaParam.width &&
      this.boy.x + this.boy.width > eachZapatillaParam.x &&
      this.boy.y < eachZapatillaParam.y + eachZapatillaParam.height &&
      this.boy.height + this.boy.y > eachZapatillaParam.y
    ) {
      //?-------------Boy---------------------
      

      //?--------------Vida-----------------

      this.zapatillaArr.splice(i, 1);

      this.lifeArr.pop();

      if (this.lifeArr.length === 0) {
        this.audio.pause();
        this.isGameOver = true;
        canvas.style.display = "none";
        gameOverScreen.style.display = "flex";

        // if (this.score > maxScore) {
        //   maxScoreDOM.innerTexT = this.score;
        // }
      }
    }
  };

  //todo :GAMELOOP----------------------------------------------------------------------------------------------

  gameLoop = () => {
    //limpiar el canvas
    this.clearBackground();

    //*-------------------------------------------------------------------------------MOVIMIENTOS Y ACCIONES
    // Boy
    this.boyLimitedMov();

    // ABUELA
    //* SPAWN Y MOVE
    this.grandMaArr.forEach((eachGrandMa) => {
      if (this.score >= 30) {
        eachGrandMa.moveGrandMa(7);
      } else if (this.score > 10 && this.score < 30) {
        eachGrandMa.moveGrandMa(6);
      } else if (this.score <= 10) {
        eachGrandMa.moveGrandMa(3);
      }
    });

    this.spawnGrandMa();

    // Zapatilla
    this.zapatillaArr.forEach((eachZapatilla) => {
      if (this.score >= 30) {
        eachZapatilla.moveDiagonalZapatilla();
      } else {
        eachZapatilla.moveZapatilla();
      }
    });

    //*------------------------------------------------------------COLISIONES--------------------------------------------------------
    this.grandMaArr.forEach((eachGrandMaParam) => {
      this.collisionBoyGrandMa(eachGrandMaParam);
    });

    this.zapatillaArr.forEach((eachZapatillaParam, i) => {
      this.collisionZapatilla(eachZapatillaParam, i);
    });

    this.ballArr.forEach((eachBall, i) => {
      this.collisionBallBoy(eachBall, i);
    });

    this.fiveArr.forEach((eachFive) => {
      this.collisionFiveBoy(eachFive);
    });

    //------------------------------------------------dibujar elementos---------------------------------------------------------------->

    this.drawBackground();
    this.boy.drawBoy();

    this.grandMaArr.forEach((eachGrandMa) => {
      eachGrandMa.drawGrandMa();
    });

    //solo va a funcionar cuando el score supere los 20
    this.zapatillaArr.forEach((eachZapatilla) => {
      eachZapatilla.drawZapatilla();
    });

    this.ballArr.forEach((eachBall) => {
      eachBall.drawBall();
    });

    this.lifeArr.forEach((eachlife) => {
      eachlife.drawLife();
    });

    this.fiveArr.forEach((eachFive) => {
      eachFive.drawFive();
    });


    // recursion para la animacion
    if (!this.isGameOver) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
