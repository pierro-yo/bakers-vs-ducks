const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;
const pauseButton = document.getElementById('pauseButton')

// global variables
// Each cell row will be 100px wide and 100px tall
const cellSize = 100;   
const cellGap = 3;
let sometext = "hello there";
let numberOfResources = 150;
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
let gamePause = false
let score = 0;
let defenderCost = 50;

let frameDuration = 0;
let frameData = 1;

let baguette = {defenderId: 1, health: 85, firerate: 150, range: 550, image: "../../images/entityImages/baguetteBazooka100.png", projectileImage: "../../images/projectileImages/baguedited.png", projectilePower: 50, boomerang: false, cost: 150}
let croissant = {defenderId: 2, health: 65, firerate: 50, range: 400, image: "../../images/entityImages/croissantBoomerang100.png", projectileImage: "../../images/projectileImages/croissant.png", projectilePower: 20, boomerang: true, cost: 50}
let gatling = {defenderId: 3, health: 35, firerate: 20, range: 1000, image: "../../images/entityImages/granaryGatling.png", projectileImage: "../../images/projectileImages/sunflowerSeed.png", projectilePower: 2, boomerang: false, cost: 80}
let slice = {defenderId: 4, health: 40, firerate: 50, range: 1000, image: "../../images/entityImages/sliceSlinger.png", projectileImage: "../../images/projectileImages/slicedBread.png", projectilePower: 10, boomerang: false, cost: 40}

const defendersValues = [baguette, croissant, gatling, slice]
const floatingMessages = [];
const defenders = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
const resources = []


// holds data about each individual cell
const gameGrid = []

// mouse 
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
    clicked: false
}

canvas.addEventListener('mousedown', function(){
    mouse.clicked = true;
});
canvas.addEventListener('mouseup', function(){
    mouse.clicked = false;
});

let canvasPosition = canvas.getBoundingClientRect();
// returns a dom object relative to the position and size on the canvas
// this is used for knowing where the mouse is on the canvas

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
})

canvas.addEventListener('mouseleave', function(){
    mouse.x = undefined
    mouse.y = undefined
})

// function handleMouse(e) {
//     mouse.x = undefined
//     mouse.y = undefined
// }

// game board
const controlsBarTop = {
    width: canvas.width,
    height: cellSize,
}
const controlsBarBottom = {
    width: canvas.width,
    height: cellSize,
}


// this for loop repesenents rows. It starts at cellsize to give space for the top menu bar
// it then reaches the end of the row, the outer loop increments 'y' to move down to the next row,
// and the inner loop starts again for the new row, filling in the positions horizontally.

function createGrid(){
    for (let y = cellSize; y < canvas.height - 100; y += cellSize){
        for (let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid();
function handleGameGrid(){
    for (let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}

function increaseFrameData() {
    frameData++;
    console.log(frameData);
}

// function createGrid() {
//     for (let y = cellSize; y < canvas.height - cellSize; y += cellSize) {
//         gameRow = []
//         for (let x = 0; x < canvas.width; x += cellSize) {
//             gameRow.push(new Cell(x, y));
//         }
//         gameGrid.push(gameRow)
//         // console.log(gameGrid[1][2])
//     }
// // The commented out code is an example of how the game grid can access different cells, the first index refers to the row, the second
// // refers to the column
// }

// createGrid();

// // This function iterates over each row (gameRow) in the gameGrid.
// function handleGameGrid() {
//     gameGrid.forEach(function(gameRow) {
//         gameRow.forEach(function(cell) {
//             cell.draw()
//         })
//     })
//     // for (let i = 0; i < gameGrid.length; i++) {
//     //    gameGrid[i].draw()
//     }

// The commented-out code above is an alternative way to achieve the same result using a traditional for loop.
    // It loops through each element in gameGrid (which represents a row) and calls the draw method for each cell.
    // However, using forEach is a concise and more modern approach.

canvas.addEventListener('click', function(){
    if(!gamePause) {
        const gridPositionX = mouse.x  - (mouse.x % cellSize) + cellGap;
        const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
        if (gridPositionY < cellSize) return;
        if (gridPositionY > 500) return;
        for (let i = 0; i < defenders.length; i++){
            if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return;
            }

            if (chosenDefender === 1 && numberOfResources >= defendersValues[0].cost){
                defenders.push(new Defender(defendersValues[0], gridPositionX, gridPositionY));
                numberOfResources -= defendersValues[0].cost;
            } else if (chosenDefender === 2 && numberOfResources >= defendersValues[1].cost){
                defenders.push(new Defender(defendersValues[1], gridPositionX, gridPositionY));
                numberOfResources -= defendersValues[1].cost;
            } else if (chosenDefender === 3 && numberOfResources >= defendersValues[2].cost){
                defenders.push(new Defender(defendersValues[2], gridPositionX, gridPositionY));
                numberOfResources -= defendersValues[2].cost;
            } else if (chosenDefender === 4 && numberOfResources >= defendersValues[3].cost){
                defenders.push(new Defender(defendersValues[3], gridPositionX, gridPositionY));
                numberOfResources -= defendersValues[3].cost;
        } else {
            floatingMessages.push(new floatingMessage("Not enough bread crumbs", mouse.x, mouse.y, 20, 'black'))
        }
    }  
});

pauseButton.addEventListener('click', function(){
    gamePause = !gamePause
    if (!gamePause && !gameOver) animate()
    ctx.textAlign = 'left'
})

function animate() {

    if (frameDuration === 7200) {
        increaseFrameData();
        frameDuration = 0;
    }
    // this clears the cell, so only the highlighted cell will be shown
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = "gray"
    // ctx.fillRect(0, 0, controlsBarTop.width, controlsBarTop.height)
    
    ctx.clearRect(0, 500, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(70 70 70 / 56%)"
    ctx.fillRect(0, 500, controlsBarBottom.width, controlsBarBottom.height)

    handleGameGrid();
    handleDefenders();
    handleProjectiles();
    handleEnemies();
    chooseDefender()
    handleFloatingMessages();

    frameDuration += 1;
    frame+=frameData;   

    // ctx.clearRect(0, 500, canvas.width, canvas.height)
    // ctx.fillStyle = "rgb(70 70 70 / 56%)"
    // ctx.fillRect(0, 500, controlsBarBottom.width, controlsBarBottom.height)

// Border around playable grid
    ctx.strokeStyle = "silver";
    ctx.strokeRect(0, 100, 900, 400);
    
// playing around with putting a score in the top part
    ctx.strokeStyle = "rgb(70 70 70 / 56%)";
    ctx.fillStyle = "rgb(70 70 70 / 56%)"
    ctx.beginPath();
    ctx.roundRect(0, 10, 350, 85, 30);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "rgb(245 222 179 / 75%)";
    ctx.font = "bold 22px Arial"
    ctx.fillText(`Score: ${score}`, 20, 35)
    ctx.fillText(`Level: ${frameData}`, 20, 85);
    ctx.fillText(`Bread Crumbs: ${numberOfResources}`, 20, 60)

    ctx.fillStyle = "rgb(0 0 0 / 100%)";
    
// -----------------------------------------

// this displays the lose screen
    if (!gameOver && !gamePause) requestAnimationFrame(animate)
    if (gameOver){

        ctx.strokeStyle = "rgb(70 70 70 / 56%)";
        ctx.fillStyle = "rgb(70 70 70 / 56%)"
        ctx.beginPath();
        ctx.roundRect(150, 175, 600, 225, 30);
        ctx.stroke();
        ctx.fill();
        
        ctx.fillStyle = "rgb(245 222 179 / 75%)";
        ctx.font = 'bold 90px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, 280);
        ctx.font = 'bold 60px Arial';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, 370);
        pauseButton.style.display = "none";
        
    }
    // this displays the paused game text
    if (gamePause){
        ctx.strokeStyle = "rgb(70 70 70 / 56%)";
        ctx.fillStyle = "rgb(70 70 70 / 56%)"
        ctx.beginPath();
        ctx.roundRect(250, 230, 400, 125, 30);
        ctx.stroke();
        ctx.fill();
        // ctx.fillStyle = "rgb(70 70 70 / 56%)"
        // ctx.fillRect(250, 230, 400, 125)
        ctx.textAlign = 'center'
        ctx.fillStyle = "rgb(245 222 179 / 75%)";
        ctx.font = 'bold 90px Arial';
        ctx.fillText('PAUSED', canvas.width / 2, 330);
    }
}

animate();

// detects collisions between two rectangles
function collision(first, second) {
    if (!(first.x > second.x + second.width || first.x +first.width < second.x || first.y > second.y + second.height ||
    first.y + first.height < second.y)) {
        return true
    }
}

// recalibrates mouse pointer when resizing window
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})