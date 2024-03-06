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
let numberOfResources = 300;
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
let gamePause = false
let score = 0;
let defenderCost = 50;

let frameDuration = 0;
let frameData = 1;

let defender1 = {health: 85, firerate: 250, image: "../../images/entityImages/baguetteBazooka100.png", projectileImage: "../../images/projectileImages/baguedited.png", projectilePower: 35}
let defender2 = {health: 65, firerate: 50, image: "../../images/entityImages/croissantBoomerang100.png", projectileImage: "../../images/projectileImages/croissant.png", projectilePower: 10}

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
        let defenderCost = 50;
        if (numberOfResources >= defenderCost) {
            if (chosenDefender === 1){
                defenders.push(new Defender(defender1, gridPositionX, gridPositionY));
                numberOfResources -= defenderCost;
        } else {
            defenders.push(new Defender(defender2, gridPositionX, gridPositionY));
            numberOfResources -= defenderCost;
        }
        } else {
            floatingMessages.push(new floatingMessage("Not enough bread crumbs", mouse.x, mouse.y, 20, 'black'));
        }
    } 
});

pauseButton.addEventListener('click', function(){
    gamePause = !gamePause
    if (!gamePause && !gameOver) animate()
    console.log(gamePause)
})

function animate() {

    if (frameDuration === 6000) {
        increaseFrameData();
        frameDuration = 0;
    }
    // this clears the cell, so only the highlighted cell will be shown
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = "gray"
    // ctx.fillRect(0, 0, controlsBarTop.width, controlsBarTop.height)

    handleGameGrid();
    handleDefenders();
    handleProjectiles();
    handleEnemies();
    chooseDefender()
    handleFloatingMessages();

    frameDuration += 1;
    frame+=frameData;   

    ctx.clearRect(0, 500, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(70 70 70 / 56%)"
    ctx.fillRect(0, 500, controlsBarBottom.width, controlsBarBottom.height)


    
// playing around with putting a score in the top part
    ctx.textAlign = "left"
    ctx.fillStyle = "black"
    ctx.font = "25px Arial"
    ctx.fillText(`Score: ${score}`, 190, 40)
    ctx.fillText(`Bread Crumbs: ${numberOfResources}`, 190, 80)
// -----------------------------------------

// this displays the lose screen
    if (!gameOver && !gamePause) requestAnimationFrame(animate)
    if (gameOver){
        ctx.fillStyle = "rgb(70 70 70 / 56%)"
        ctx.fillRect(150, 175, 600, 225)
        
        ctx.fillStyle = "rgb(245 222 179 / 75%)";
        ctx.font = '90px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, 280);
        ctx.font = '60px Arial';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, 370);
        pauseButton.style.display = "none";
        
    }
    if (gamePause){
        ctx.fillStyle = "rgb(70 70 70 / 56%)"
        ctx.fillRect(250, 230, 400, 125)
        ctx.textAlign = 'center'
        ctx.fillStyle = "rgb(245 222 179 / 75%)";
        ctx.font = '90px Arial';
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