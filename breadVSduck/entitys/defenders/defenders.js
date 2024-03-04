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
        this.chosenDefender = chosenDefender;
        this.projectileImage = dict.projectileImage
        this.projectilePower = dict.projectilePower
        

        this.image = new Image()
        this.image.src = dict.image
        console.log(dict)
        console.log("class", this.chosenDefender)
    }
    draw() {
        ctx.fillStyle = 'gold';
        ctx.font = '30px Orbitron';
        if (this.chosenDefender === 1){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        } else if (this.chosenDefender === 2){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);

    }
    // the update function for the defence is slightly different
    // here we are checking on update, if shooting is true
    // shooting is something that will be defined within the game logic under
    // a handle defender mechanic or something of the sort to allow this to happen
    update() {
        if (this.shooting) {
            this.timer++;
            if (this.timer % this.firerate === 0) {
                projectiles.push(new Projectile({image: this.projectileImage, power: this.projectilePower}, this.x + 70, this.y + 50));
            }
        } else {
            this.timer = 0;
        }
    }
}

const card1 = {
    x: 10,
    y: 10,
    width: 70,
    height: 85
}

const card2 = {
    x: 100,
    y: 10,
    width: 70,
    height: 85
}
let chosenDefender = 2;

function chooseDefender(){
    let card1stroke = 'black';
    let card2stroke = 'black';
    console.log("here",chosenDefender)
    if (collision(mouse, card1) && mouse.clicked){
        chosenDefender = 1;
    } else if (collision(mouse, card2) && mouse.clicked){
        chosenDefender = 2;
    }

    if (chosenDefender === 1){
        card1stroke = 'red';
        card2stroke = 'black';
    }else if (chosenDefender === 2){
        card1stroke = 'black';
        card2stroke = 'red';
    }else {
        card1stroke = 'black';
        card2stroke = 'black';
    }

    image1 = new Image()
    image1.src = "../../images/entityImages/baguetteBazooka100.png"
    image2 = new Image()
    image2.src = "../../images/entityImages/croissantBoomerang100.png"
    ctx.linewidth = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(card1.x, card1.y, card1.height, card1.width);
    ctx.drawImage(image1, card1.x+5, card1.y, card1.width, card1.height-15)
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(card1.x, card1.y, card1.height, card1.width);
    ctx.fillRect(card2.x, card2.y, card2.height, card2.width);
    ctx.drawImage(image2, card2.x+5, card2.y, card2.width, card2.height-15);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(card2.x, card2.y, card2.height, card2.width);
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
                enemies[j].movement = 0;
                defenders[i].health -= 1;
            }
            if (defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}