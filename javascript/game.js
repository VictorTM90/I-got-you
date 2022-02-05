class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./img/fondo.png";
  }

  // *FUNCIONES

  //? El background: Dibujar y limpiar.
  clearBackground = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  drawBackground = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };

  //?

  gameLoop = () => {
    // console.log ("el juego funciona?")

    //limpiar el canvas
    this.clearBackground();
    //movimientos y acciones

    // dibujar elementos
    this.drawBackground();
   // this.boy.drawBoy();
    //console.log (this.boy.drawBoy())
    
    // recursion para la animacion
    requestAnimationFrame(this.gameLoop);
  };
}
