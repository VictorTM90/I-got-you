class Five {
    constructor (){
        this.x = Math.floor(Math.random()* canvas.width);
        this.y = Math.floor(Math.random()* 350)+ 150;
        this.width= 50;
        this.height= 50;
        this.img = new Image ();
        this.img.src = "../img/puntuacion.png"
    }

    drawFive=()=>{
        ctx.drawImage (this.img, this.x, this.y, this.width, this.height); 
    }


}