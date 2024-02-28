canvas.addEventListener('click', function(e){
    const gridPositionX = (e.x - canvasPosition.left) - ((e.x - canvasPosition.left)%cellSize) + cellGap;
    const gridPositionY = (e.y - canvasPosition.top)- ((e.y - canvasPosition.top)%cellSize) + cellGap;
    if (gridPositionY < cellSize) return;
    for (let i = 0; i < defenders.length; i++){
        if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return;
    }
    defenders.push(new Defender(gridPositionX, gridPositionY));

})

function handleDefenders(){
    for (let i = 0; i < defenders.length; i++){
        defenders[i].draw();
        defenders[i].update();
        if (enemyPositions.indexOf(defenders[i].y) !== -1) {
            console.log(enemyPositions.indexOf(defenders[i].y));
            defenders[i].shooting = true;
        } else {
            defenders[i].shooting = false;
            defenders[i].timer = 0;
        }
        for (let j = 0; j < enemies.length; j++){
            if (defenders[i] && collision(defenders[i], enemies[j])){
                enemies[j].movement = 0;
                defenders[i].health--;
            }
            if (defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
            }
        }

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
        if (projectiles[i] && projectiles[i].x >= range || projectiles[i] && projectiles[i].x >= canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
    }
}

let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
        if (enemies[i] && enemies[i].health <= 0){
            const findThisIndex = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(findThisIndex,1);
            enemies.splice(i, 1);
            i--
            score++;
        }
    }
    if (frame % enemiesInterval === 0 && score < winningScore) {
        verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        enemies.push(new Enemy(verticalPosition));
        enemyPositions.push(verticalPosition);
        if (enemiesInterval > 100) enemiesInterval -= 100;
        console.log('enemy added ' + enemiesInterval);
    };
};