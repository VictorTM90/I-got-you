class Ball {
    constructor () {
        this.x = Math.floor(Math.random()* (canvas.width-60)+60);
        this.y = Math.floor(Math.random()* 350)+ 150; 
        this.width = 35; 
        this.height = 35;
        this.img = new Image();
        this.img.src = "./img/ball.png"
        this.audio = "../sounds/mixkit-catching-a-basketball-ball-2081.wav"
    }

    drawBall = () =>{  
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        

    }

    clearBall = () =>{
        ctx.clearImage (this.img, this.x, this.y, this.width, this.height);
    }

    audioBall = () =>{
       // this.audio.volume = ;
        this.audio.play();
      
        setTimeout(() => {
            this.audio.pause()
        }, 3);
    } 

}