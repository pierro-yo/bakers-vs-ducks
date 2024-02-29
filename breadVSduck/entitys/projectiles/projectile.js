class Projectile {
    // x and y coords relate to the placement on screen
    // the constructor will eventually take more than just the x and y, like the power and image source
    // width and height correlate to the actual image size, they are a bit odd but it works for now
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 40;
        this.power = 20;
        this.speed = 5;

        this.image = new Image()
        this.image.src = "breadVSduck/images/projectileImages/baguedited.png"
    }
    // this simulates the projectile moving by speed amount of pixels every time
    update(){
        this.x += this.speed;
    }
    // this draws the projectile image
    draw(){
        ctx.drawImage(this.image, this.x, this.y-20, this.width, this.height)

        ctx.beginPath();
    }
}

function handleProjectiles(){
    for (let i = 0; i < projectiles.length; i++){
        projectiles[i].update();
        projectiles[i].draw();

        for (let j = 0; j < enemies.length; j++){
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
    }
}