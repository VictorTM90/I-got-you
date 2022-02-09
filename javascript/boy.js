class Boy {
  constructor() {
    this.x = canvas.width / 2; // posición en el eje x
    this.y = canvas.height / 2; // posicion en el eje y
    this.width = 90;
    this.height = 105;
    this.img = new Image();
    this.img.src = "./img/run-boy.png";
  }
  //*VARIABLES DEL CONTROL DE MOVIMIENTO
  

  //* funciones: ACCIONES Y MOVIMIENTOS
  drawBoy = () => {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  // moveBoyRightX = ()=>{
  //     this.x += 50;
  // }
  // moveBoyLeftX = ()=>{
  //     this.x -= 50;
  // }

  // moveBoyUpY = ()=>{
  //     this.y -= 50;
  // }

  // moveBoyDownY = ()=>{
  //     this.y += 50;
  // }

  moveBoy = (event) => {
    if (event.key === "ArrowRight") {
      this.x = this.x + 45;
      this.img.src = "./img/run-boy.png"
    } else if (event.key === "ArrowLeft") {
      this.x = this.x - 45;
      this.img.src = "./img/run-boy-left.png"
    } else if (event.key === "ArrowUp") {
      this.y = this.y - 45;
    } else if (event.key === "ArrowDown") {
      this.y = this.y + 45;
    }
  };
}


