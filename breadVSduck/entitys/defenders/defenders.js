class Defender {
    // contains everything that we will need to be able to create the enemy
    // the speed can be changed to whatever we want it to be
    // these are just some default values for the time being
    // do not worry about the canvas (ctx/all of the x,y positions) stuff just yet, this is code that i have taken from
    // something that I have worked on this morning 27-02-24
    constructor(dict, x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shooting = false;
        this.health = dict.health;
        this.firerate = dict.firerate;
        this.projectiles = [];
        this.timer = 0;
        this.shootingRange = dict.range;
        this.chosenDefender = chosenDefender;
        this.boomerang = dict.boomerang
        this.projectileImage = dict.projectileImage
        this.projectilePower = dict.projectilePower
        this.image = new Image()
        this.image.src = dict.image
        this.cost = dict.cost
        console.log(dict)
        console.log("class", this.chosenDefender)
    }
    draw() {
        ctx.fillStyle = 'gold';
        ctx.font = '30px Arial';
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    }
    // the update function for the defence is slightly different
    // here we are checking on update, if shooting is true
    // shooting is something that will be defined within the game logic under
    // a handle defender mechanic or something of the sort to allow this to happen
    update() {
        if (this.isEnemyInRange()) { // Check if enemy is in range
            this.shooting = true;
            this.timer++;
            if (this.timer % this.firerate === 0) {
                projectiles.push(new Projectile({image: this.projectileImage, power: this.projectilePower,  return: this.boomerang, bakerXPosition: this.x, bakerYPosition: this.y}, this.x + 70, this.y + 50));
            }
        } else {
            this.shooting = false;
            this.timer = 0;
        }
    }
    // isEnemyInRange() {
    //     for (let j = 0; j < enemies.length; j++){
    //         for (let i = 0; i < defenders.length; i++)
    //         if (Math.abs(enemies[j].x - this.x) <= this.shootingRange && enemies[j].y === defenders[i].y) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    isEnemyInRange() {
        for (let j = 0; j < enemies.length; j++) {
            // Check if an enemy is on the same row as the defender
            if (enemies[j].y === this.y) {
                // Check if the enemy is within the shooting range
                if (Math.abs(enemies[j].x - this.x) <= this.shootingRange) {
                    return true;
                }
            }
        }
        return false;
    }
}

const card1 = {
    x: 10,
    y: 510,
    width: 80,
    height: 90
}

const card2 = {
    x: 110,
    y: 510,
    width: 80,
    height: 90
}
const card3 = {
    x: 210,
    y: 510,
    width: 80,
    height: 90
}
const card4 = {
    x: 310,
    y: 510,
    width: 80,
    height: 90
}

let chosenDefender = 1;

function chooseDefender(){
    let card1stroke = 'black';
    let card2stroke = 'black';
    let card3stroke = 'black';
    let card4stroke = 'black';
    if (collision(mouse, card1) && mouse.clicked){
        chosenDefender = 1;
    } else if (collision(mouse, card2) && mouse.clicked){
        chosenDefender = 2;
    } else if (collision(mouse, card3) && mouse.clicked){
        chosenDefender = 3;
    } else if (collision(mouse, card4) && mouse.clicked){
        chosenDefender = 4;
    }

    if (chosenDefender === 1){
        card1stroke = 'red';
        card2stroke = 'black';
        card3stroke = 'black';
        card4stroke = 'black';
    }else if (chosenDefender === 2){
        card1stroke = 'black';
        card2stroke = 'red';
        card3stroke = 'black';
        card4stroke = 'black';
    }else if (chosenDefender === 3){
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'red';
        card4stroke = 'black';
    }else if (chosenDefender === 4){
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'black';
        card4stroke = 'red';
    }else {
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'black';
        card4stroke = 'black';
    }

    image1 = new Image()
    image1.src = "../../images/entityImages/baguetteBazooka100.png"
    image2 = new Image()
    image2.src = "../../images/entityImages/croissantBoomerang100.png"
    image3 = new Image()
    image3.src = "../../images/entityImages/granaryGatling.png"
    image4 = new Image()
    image4.src = "../../images/entityImages/sliceSlinger.png"
    ctx.linewidth = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(card1.x, card1.y, card1.height, card1.width);
    ctx.drawImage(image1, card1.x+5, card1.y, card1.width, card1.height-15)
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(card1.x, card1.y, card1.height, card1.width);
    ctx.fillStyle = "rgb(245 222 179 / 75%)";
    ctx.font = "bold 22px Arial"
    ctx.fillText(`${defendersValues[0].cost}`, 70, 560)
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(card2.x, card2.y, card2.height, card2.width);
    ctx.drawImage(image2, card2.x+5, card2.y, card2.width, card2.height-15);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(card2.x, card2.y, card2.height, card2.width);
    ctx.fillStyle = "rgb(245 222 179 / 75%)";
    ctx.font = "bold 22px Arial"
    ctx.fillText(`${defendersValues[1].cost}`, 170, 560)
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(card3.x, card3.y, card3.height, card3.width);
    ctx.drawImage(image3, card3.x+5, card3.y, card3.width, card3.height-15);
    ctx.strokeStyle = card3stroke;
    ctx.strokeRect(card3.x, card3.y, card3.height, card3.width);
    ctx.fillStyle = "rgb(245 222 179 / 75%)";
    ctx.font = "bold 22px Arial"
    ctx.fillText(`${defendersValues[2].cost}`, 270, 560)
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(card4.x, card4.y, card4.height, card4.width);
    ctx.drawImage(image4, card4.x+5, card4.y, card4.width, card4.height-15);
    ctx.strokeStyle = card4stroke;
    ctx.strokeRect(card4.x, card4.y, card4.height, card4.width);
    ctx.fillStyle = "rgb(245 222 179 / 75%)";
    ctx.font = "bold 22px Arial"
    ctx.fillText(`${defendersValues[3].cost}`, 370, 560)
}

function handleDefenders(){
    for (let i = 0; i < defenders.length; i++){
        defenders[i].draw();
        defenders[i].update();
        if (enemyPositions.indexOf(defenders[i].y) !== -1){
            defenders[i].shooting = true;
        } else {
            defenders[i].shooting = false;
        }
        for (let j = 0; j < enemies.length; j++){
            if (defenders[i] && collision(defenders[i], enemies[j])){
                enemies[j].timer ++
                enemies[j].movement = 0;
                if(enemies[j].timer % enemies[j].attackRate === 0){
                    console.log(enemies[j].attackDamage)
                    defenders[i].health -= enemies[j].attackDamage;
                }
            }
            if (defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}