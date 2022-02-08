class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./img/fondo.png";
    this.boy = new Boy();
    this.grandMaArr = [new Grandma(150, "../img/grand-ma2.png")];
    this.ballArr= [new Ball(150,"../img/ball.png")]; 
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
 
  //funciones de control (time-interval and set timeOut)

  

 
 
  //*spawn de abuelas (BONUS: aleatorio en dos carrilles)

  spawnGrandMa = () => {
    let lastGrandMa = this.grandMaArr[this.grandMaArr.length - 1];
    if (lastGrandMa.x > canvas.width - 550) {
      let randomY = Math.floor(Math.random()* 350)+ 150 //! ATENTO AL RESPONSIVE MEDIDAS!!!!!
      let newGrandma = new Grandma(randomY, "../img/grand-ma2.png");
      this.grandMaArr.push(newGrandma);
    } 
    if (this.grandMaArr.length > 10){
      this.grandMaArr.slice()
    }
  };



  //! Control del spawn de balones 
//   spawnBall = (event) =>{
//    let count = 0; 
//    if (count > 8){
//    this.ball.drawBall(); 
//    count = 0;
//    } else if (event.key === "ArrowRight") {
//     count ++; 
//   } else if (event.key === "ArrowLeft") {
//     count ++;
//   } else if (event.key === "ArrowUp") {
//     count ++;
//   } else if (event.key === "ArrowDown") {
//     count ++;
//   }
// }
  //? controlar por tiempo. cada 15 seg. 
  //?eliminar las abuelas del array.

  boyLimitedMov = () => {
    if (this.boy.x > canvas.width - this.boy.width) {
      this.boy.x = canvas.width - this.boy.width;
    } else if (this.boy.x < 0) {
      this.boy.x = 0;
    } else if (this.boy.y > canvas.height -this.boy.height){
      this.boy.y = canvas.height - this.boy.height;
    } else if (this.boy.y < canvas.height/6 ){
      this.boy.y = canvas.height/6 

    }

  }

  // collisiones

  collisionBoyGrandMa = (eachGrandMaParam) =>{
   if(
      this.boy.x < eachGrandMaParam.x + eachGrandMaParam.width/2 &&
      this.boy.x + this.boy.width/2>eachGrandMaParam.x &&
      this.boy.y< eachGrandMaParam.y + eachGrandMaParam.height /1.25&&
      this.boy.height /1.25 + this.boy.y> eachGrandMaParam.y
    ){
      this.isGameOver = true; 
      canvas.style.display = "none"
      gameOverScreen.style.display = "flex"

    }
  }
  
  collisionBallBoy = (eachBall, i)=>{ 
   
    if (this.boy.x < eachBall.x + eachBall.width &&
      this.boy.x + this.boy.width> eachBall.x &&
      this.boy.y< eachBall.y + eachBall.height &&
      this.boy.height + this.boy.y> eachBall.y)
      
      {
        console.log("sumo 5pts")
        
        this.ballArr.splice(this.ballArr[i],1); 
        
        this.ballArr.push(new Ball(150,"../img/ball.png"));


        
        // this.ball.clearBall();
        //*Dibujar el +5
          //drawFive();
        //*limpiar el balon 
          //clearBall (); 

        //*dibujar otro balon
        // spawnBall = ()=>{
        // let lastBall = this.ballArr[this.ballArr.length -1 ]; 
        // if ( abb= c )
        // 
        // let newBall = new Ball (posXrandom, posYrandom)  
        // this.ballArr.push(newBall); 
        // }
        
      
        //drawBall


     
     
      }

  }

  //?

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
    this.grandMaArr.forEach((eachGrandMaParam)=>{
      this.collisionBoyGrandMa(eachGrandMaParam);
    })
    
    this.ballArr.forEach((eachBall,i)=>{
      this.collisionBallBoy(eachBall,i);
    })


    // dibujar elementos

    this.drawBackground();
    this.boy.drawBoy();

    // this.ball.drawBall(); 
    
    this.grandMaArr.forEach((eachGrandMa) => {
      eachGrandMa.drawGrandMa();
    });
    
    
    
    this.ballArr.forEach((eachBall)=>{
      eachBall.drawBall();
    })
    

    

    // recursion para la animacion
   
   if (!this.isGameOver){
     requestAnimationFrame(this.gameLoop);
   }
  };
}


