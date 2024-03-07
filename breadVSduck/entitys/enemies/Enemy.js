class Enemy {
    // contains everything that we will need to be able to create the enemy
    // the speed can be changed to whatever we want it to be
    // these are just some default values for the time being

    // do not worry about the canvas (ctx/all of the x,y positions) stuff just yet, this is code that i have taken from
    // something that I have worked on this morning 27-02-24
    constructor(verticalPosition, dict) {
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = dict.speed;
        this.movement = this.speed;
        this.health = dict.health;
        this.maxHealth = this.health;
        this.gainedResources = dict.gainedResources
        this.attackRate = dict.attackRate;
        this.attackDamage = dict.attackDamage;
        this.timer = 0

        this.image = new Image()
        this.image.src = dict.image
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
        ctx.font = '30px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 5, this.y + 20);
    }
}

let coneDuck = {speed: 0.5, health: 65, image: "../../images/entityImages/duckWithCone.png", gainedResources: 6, attackRate: 25, attackDamage: 5}
let bucketDuck = {speed: 0.4, health: 75, image: "../../images/entityImages/bucketDuck.png", gainedResources: 7, attackRate: 25, attackDamage: 5}
let bubbleDuck = {speed: 0.3, health: 85, image: "../../images/entityImages/bubblewrapDuck.png", gainedResources: 8, attackRate: 50, attackDamage: 10}
let mallardDuck = {speed: 0.6, health: 50, image: "../../images/entityImages/regularDuck.png", gainedResources: 5, attackRate: 50, attackDamage: 5}
let poleDuck = {speed: 0.7, health: 55, image: "../../images/entityImages/polevaultDuck.png", gainedResources: 5, attackRate: 50, attackDamage: 5}

let enemyOptions = [coneDuck, bucketDuck, bubbleDuck, mallardDuck, poleDuck]

function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
        if (enemies[i].x < 0){
            gameOver = true;
        }
        if (enemies[i].health <= 0){

            let gainedResources = enemies[i].gainedResources;

            floatingMessages.push(new floatingMessage('+' + gainedResources, enemies[i].x, enemies[i].y, 30, 'black'));
            floatingMessages.push(new floatingMessage('+' + gainedResources, 250, 50, 30, 'gold'));

            numberOfResources += gainedResources;
            score += gainedResources;

            const findThisIndex = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(findThisIndex, 1);
            enemies.splice(i, 1);
            i--;
        }
        // Code to check if an enemy has collided with a defender, and if not, ensuring the 
        // enemy movement is set to it's speed (this covers a check for once a defender has dies and sets enemy movement again)
        for (let j = 0; j < defenders.length; j++) {
            if (enemies[i] && !collision(defenders[j], enemies[i])) {
                enemies[i].movement = enemies[i].speed
            }
        }
    }
    if (frame % enemiesInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 4 + 1) * cellSize + cellGap;
        let index = Math.floor(Math.random() * 5)
        enemies.push(new Enemy(verticalPosition, enemyOptions[index]));
        enemyPositions.push(verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 50;
    }
}