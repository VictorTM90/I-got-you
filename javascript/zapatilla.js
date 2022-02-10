class Zapatilla {
  constructor(positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
    this.width = 30;
    this.height = 30;
    this.img = new Image();
    this.img.src = "./img/zapatilla.png";
    this.audio = new Audio("../sounds/swish_2.wav");
  }

  drawZapatilla = () => {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  audioZapatilla = () => {
    this.audio.volume = 0.1;

    setTimeout(() => {
      this.audio.play();
    }, 500);
  };

  moveZapatilla = () => {
    this.x = this.x + 10;
    // this.audioZapatilla();
  };

  moveDigonalZapatilla = () => {
    if (this.y > canvas.widht / 2) {
      this.x = this.x + 3;
      this.y = this.y - 2;
    } else if (this.y < canvas.width / 2) {
      this.x = this.x + 3;
      this.y = this.y + 2;
    }
  };
}
