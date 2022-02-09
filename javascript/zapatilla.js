class Zapatilla {
    constructor (positionX, positionY){
        this.x = positionX;
        this.y = positionY;
        this.width = 30;
        this.height = 30;
        this.img = new Image();
        this.img.src = "./img/zapatilla.png"
        this.audio = new Audio ("../sounds/swish_2.wav")
    }

    drawZapatilla =()=>{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    audioZapatilla = ()=>{
        this.audio.volume = 0.2;
        this.audio.play();
      
        setTimeout(() => {
            this.audio.pause()
        }, 5);
    };

    moveZapatilla = ()=>{
        this.x = this.x + 7 ;   
    }

}