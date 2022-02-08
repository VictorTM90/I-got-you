class Grandma {
    constructor(postionY){
        this.x = 0;
        this.y= postionY;
        this.width = 100;
        this.height = 125;
        this.img = new Image ();
        this.img.src="../img/grand-ma2.png"
    }

    //*Acciones y métodos
    drawGrandMa= ()=>{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    moveGrandMa = () =>{
        this.x = this.x + 3;
    }

}