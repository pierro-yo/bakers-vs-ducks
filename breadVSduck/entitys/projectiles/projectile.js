class Projectile {
    // x and y coords relate to the placement on screen
    // the constructor will eventually take more than just the x and y, like the power and image source
    // width and height correlate to the actual image size, they are a bit odd but it works for now
    constructor(dict, x, y){
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 40;
        this.power = dict.power;
        this.speed = 5;

        this.image = new Image()
        this.image.src = dict.image
        this.return = dict.return
        this.direction = "forward"
    }
    // this simulates the projectile moving by speed amount of pixels every time
    // update(){
    //     this.x += this.speed;
    // }

    // reduce(){
    //     this.x -= this.speed;
    // }

    projectileMovement() {
        if(this.direction === "forward") {
            this.x += this.speed;
        } else if (this.direction === "back") {
            this.x -= this.speed
        }
    }

    // this draws the projectile image
    draw(){
        ctx.drawImage(this.image, this.x, this.y-20, this.width, this.height)

        ctx.beginPath();
    }
}

function handleProjectiles(){
    for (let i = 0; i < projectiles.length; i++){
        projectiles[i].projectileMovement("forward");
        projectiles[i].draw();

        for (let j = 0; j < enemies.length; j++){
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
                enemies[j].health -= projectiles[i].power;
                if (projectiles[i].return === true) {
                    // projectiles.splice(i, 1);
                    // i--;
                    console.log("should return")
                    projectiles[i].direction = "back";
                    projectiles[i].draw();
                } else {
                    projectiles.splice(i, 1);
                    i--;
                }
                
            }
        }
        
        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
    }
}