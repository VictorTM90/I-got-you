class Grandma {
    constructor(){
        this.x = 15;
        this.y= canvas.height / 3;
        this.width = 100;
        this.height = 125;
        this.img = new Image ();
        this.img.src="../img/grand-ma2.png"
    }

    //*Acciones y métodos
    drawGrandMa= ()=>{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    





}