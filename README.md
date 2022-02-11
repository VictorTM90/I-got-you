**Project's name**

I'll got you !
 
**Description**

El objetivo del juego es mantenerse el mayor tiempo posible sin que las abuelas te atrapen. 
El jugador puede moverser horizontalmente y saltar. El juego finaliza cuando una abuela te atrapa. 
La puntuación se calcula según la cantidad de veces que has chutado la pelota y los bouns por el movimiento (+ 5 puntos). 

**MVP**

El juego tiene un personaje principal que se desplaza y suma puntos cuando colisiona. 

Las abuelas tiran zapatillas. 

Si una abuela te pilla, se acaba el juego. 


**Backlog**

Incrementar la dificultad:

Abuelas aparecen de ámbos lados del canvas. 
Al colisionar con una zapatilla, el desplazamiento se reduce. 
Puntuación Máxima. 


**Data Structure** 


Main : 

 StartGame()
 ReStartGame()

Class Game: 

    clearBackground()
    drawBackground()
    spawnGrandMa()
    spawnZapatilla()
    spawnFive()
    boyLimitedMov()
    collisionBallBoy()
    collisionFiveBoy()
    collisionBoyGrandMa()
    collisionZapatilla()
    gameLoop()


Class Grandma:
    drawGrandMa
    moveGrandMa()

Class Boy: 
    drawBoy()    
    moveBoy(event)

Class five: 
    drawFive()
    audioFive()

Class life: 
    drawLife ()

Class 



**States y States Transitions**

Splash screen (pantalla de incio)
Game screen (pantalla del juego)
Game over screen (pantalla final y re-start)





