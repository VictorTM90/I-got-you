class Five {
    constructor (){
        this.x = Math.floor(Math.random()* (canvas.width-200)) + 100;
        this.y = Math.floor(Math.random()* 350)+ 150;
        this.width= 50;
        this.height= 50;
        this.img = new Image ();
        this.img.src = "./img/puntuacion.png"

        this.audio = "../sounds/cartoon_wink_magic_sparkle-6896.mp3"
    }

    drawFive=()=>{
        ctx.drawImage (this.img, this.x, this.y, this.width, this.height); 
    }


}