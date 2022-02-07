class Ball {
    constructor () {
        this.x = 550;
        this.y = 300; 
        this.width = 30; 
        this.height = 30;
        this.img = new Image();
        this.img.src = "../img/ball.png"
    }

    drawBall = () =>{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }




}