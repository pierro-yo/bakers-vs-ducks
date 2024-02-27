import { canvas, ctx, cellSize, cellGap, enemyPositions, enemies, frame, winningScore, enemiesInterval, score, cellGap, resources } from ‘./gameLogic.js’;

class Enemy {
    // contains everything that we will need to be able to create the enemy
    // the speed can be changed to whatever we want it to be
    // these are just some default values for the time being

    // do not worry about the canvas (ctx/all of the x,y positions) stuff just yet, this is code that i have taken from
    // something that I have worked on this morning 27-02-24
    constructor(verticalPosition) {
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 50;
        this.maxHealth = this.health;

        this.image = new Image()
        this.image.src = "images/duckWithCone.png"
    }

    // update function decreases the x axis to simulate the enemy moving closer to the bakery
    update() {
        this.x -= this.movement;
    }

    // using draw we are able to create the enemy and place it onto the canvas that we dont have yet
    // when drawing the enemy we are also displaying the health value as well
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    }
}

export { Enemy };