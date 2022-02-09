class Grandma {
    constructor(){
        this.x = 0;
        this.y= Math.floor(Math.random() * 350) + 150;
        this.width = 100;
        this.height = 125;
        this.img = new Image ();
        this.img.src="./img/grand-ma2.png"
        
    }

    //*Acciones y métodos
    drawGrandMa= ()=>{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    moveGrandMa = (spaceMoveParam) =>{
        
        this.x = this.x + spaceMoveParam;
    }

}