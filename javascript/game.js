class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./img/fondo.png";
   
    this.audio = new Audio ("../sounds/Inicio.mp3")
   
   
    this.boy = new Boy();
    this.grandMaArr = [new Grandma(150)];
    this.zapatillaArr = [new Zapatilla(150)];
  
    this.ballArr = [new Ball(150)];
    this.fiveArr = [];

    this.count = 0;
    this.score = 0;

    this.positionX = 0;
    this.positionY = 0;
    
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
    if (lastGrandMa.x > canvas.width / 2) {
      // let randomY = Math.floor(Math.random() * 350) + 150; //! ATENTO AL RESPONSIVE MEDIDAS!!!!!
      let newGrandma = new Grandma();

      // console.log (newGrandma)

      //! pk no funciona, estoy accediendo a la nueva instancia ??
      this.positionX = newGrandma.x;
      this.positionY = newGrandma.y;

      //console.log (newGrandma.y,   newGrandma.x)

      this.grandMaArr.push(newGrandma); // sacar fuera con variable
      this.spawnZapatilla(); // ejecutar la funcion a la vez
    }

    if (this.grandMaArr.length > 10) {
      this.grandMaArr.slice();
    }
  };

  spawnZapatilla = () => {
    // segun score
    if (this.score > 10) {
      let postParamX = this.positionX + 40;
      let postParamY = this.positionY + 40;
      // crear zapatilla  // agregar a la arr
      let newZapatilla = new Zapatilla(postParamX, postParamY);

      this.zapatillaArr.push(newZapatilla);
    }
    
  };

  //? Mover y  dibujar zapatillas

  //! Control del spawn de 5five
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
      this.boy.y < eachGrandMaParam.y + eachGrandMaParam.height / 1.3 &&
      this.boy.height / 1.3 + this.boy.y > eachGrandMaParam.y
    ) {
      this.audio.pause();
      this.isGameOver = true;
      canvas.style.display = "none";
      gameOverScreen.style.display = "flex";
    }
  };

  collisionBallBoy = (eachBall, i) => {
    if (
      this.boy.x < eachBall.x + eachBall.width / 2  &&
      this.boy.x + this.boy.width > eachBall.x &&
      this.boy.y < eachBall.y + eachBall.height /1.2 &&
      this.boy.height /1.2 + this.boy.y > eachBall.y
    ) {
      this.ballArr.splice(this.ballArr[i], 1);

      this.ballArr.push(new Ball(150));

     // this.ball.audioBall(); 

      //! implementar el score total
      this.score = this.score + 1;
      newScore.innerText = this.score;
    }
  };

  collisionFiveBoy = (eachFive, i) => {
    if (
      this.boy.x < eachFive.x + eachFive.width &&
      this.boy.x + this.boy.width > eachFive.x &&
      this.boy.y < eachFive.y + eachFive.height &&
      this.boy.height + this.boy.y > eachFive.y
    ) {
      this.fiveArr.splice(this.fiveArr[i], 1);
      
      //!implementar el score total
      this.score = this.score + 5;
      newScore.innerText = this.score;
    }
  };

  collisionZapatilla = (eachZapatillaParam) => {
    if (
      this.boy.x < eachZapatillaParam.x + eachZapatillaParam.width  &&
      this.boy.x + this.boy.width / 2 > eachZapatillaParam.x &&
      this.boy.y < eachZapatillaParam.y + eachZapatillaParam.height  &&
      this.boy.height / 1.3 + this.boy.y > eachZapatillaParam.y
    ) {
      this.audio.pause();
      this.isGameOver = true;
      canvas.style.display = "none";
      gameOverScreen.style.display = "flex";
    }
  };

  //todo :GAMELOOP

  gameLoop = () => {
    
    //limpiar el canvas
    this.clearBackground();

    //MOVIMIENTOS Y ACCIONES
    //todo: Boy
    this.boyLimitedMov();

    //todo: ABUELA
    //* SPAWN
    this.grandMaArr.forEach((eachGrandMa) => {
      if (this.score > 5 && this.score < 25) {
        eachGrandMa.moveGrandMa(6);
      } else {
        eachGrandMa.moveGrandMa(3);
      }
    });

    this.spawnGrandMa();

    //todo: Zapatilla
    this.zapatillaArr.forEach((eachZapatilla) => {
      eachZapatilla.moveZapatilla();
    });

    // this.spawnZapatilla();

    //todo: COLISIONES
    this.grandMaArr.forEach((eachGrandMaParam) => {
      this.collisionBoyGrandMa(eachGrandMaParam);
    });

    this.zapatillaArr.forEach((eachZapatillaParam) => {
      this.collisionZapatilla(eachZapatillaParam);
    });

    this.ballArr.forEach((eachBall, i) => {
      this.collisionBallBoy(eachBall, i);
    });

    this.fiveArr.forEach((eachFive) => {
      this.collisionFiveBoy(eachFive);
    });

    // dibujar elementos

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

    // ESTO SOLO VA A FUNCIONAR CUANDO SCORE TENGA VALOR

    this.fiveArr.forEach((eachFive) => {
      eachFive.drawFive();
    });

    //this.fiveArr.forEach((eachScore)=>{
    //eachScore.drawScore()
    //})

    // recursion para la animacion

    if (!this.isGameOver) {
      requestAnimationFrame(this.gameLoop);
      
    }
  };
}
