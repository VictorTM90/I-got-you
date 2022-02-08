class Ball {
    constructor () {
        this.x = Math.floor(Math.random()* canvas.width);
        this.y = Math.floor(Math.random()* 350)+ 150; 
        this.width = 30; 
        this.height = 30;
        this.img = new Image();
        this.img.src = "../img/ball.png"
    }

    drawBall = () =>{  
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        

    }

    clearBall = () =>{
        ctx.clearImage (this.img, this.x, this.y, this.width, this.height);
    }

    

}