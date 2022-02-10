class life {
    constructor (paramX){
        this.x = paramX 
        this.y = 20
        this.width = 50
        this.height = 50 
        this.img = new Image ();
        this.img.src = "./img/vida_boy.png"

    }

    drawLife = () =>{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



}