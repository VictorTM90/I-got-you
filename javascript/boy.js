class Boy {
   
   
    constructor () {
        this.x = canvas.width /2 // posición en el eje x
        this.y = canvas.height /2 // posicion en el eje y
        this.width = 35;
        this.height = 50; 
        this.img = new Image();
        this.img.src ="./img/run-boy.png"
    }

    //* funciones: ACCIONES Y MOVIMIENTOS
    drawBoy = () => {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    

    moveBoy = ()=>{
        this.x += 5; 
    }
    
    jumpBoy = ()=>{
        this.y +=30; 
    }




}