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

        this.image = new Image()
        this.image.src = dict.image
        console.log(dict)
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.fillStyle = 'gold';
        ctx.font = '30px Orbitron';
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
                projectiles.push(new Projectile(this.x + 70, this.y + 50));
            }
        } else {
            this.timer = 0;
        }
    }
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