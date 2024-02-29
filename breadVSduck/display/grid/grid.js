const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 900
canvas.height = 600

// global variables
let sometext = "hello there"
const defenders = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
// Each cell row will be 100px wide and 100px tall
const cellSize = 100   
const cellGap = 3

// holds data about each individual cell
const gameGrid = []

// mouse 
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1
}

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

function handleMouse(e) {
    mouse.x = undefined
    mouse.y = undefined
}

// game board
const controlsBarTop = {
    width: canvas.width,
    height: cellSize,
}
const controlsBarBottom = {
    width: canvas.width,
    height: cellSize,
}

// creates one new cell by taking two arguments of horizontal and vertical values
class Cell {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = cellSize
        this.height = cellSize
    }
// takes the arguments of horizontal and vertical values creates a rectangle of that size at the given coordinates
    draw() {
        if (mouse.x && mouse.y && collision(this, mouse)) {
            ctx.strokeStyle = "white"
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        }
    }  
}
// this for loop repesenents rows. It starts at cellsize to give space for the top menu bar
// it then reaches the end of the row, the outer loop increments 'y' to move down to the next row,
// and the inner loop starts again for the new row, filling in the positions horizontally.
function createGrid() {
    for (let y = cellSize; y < canvas.height - cellSize; y += cellSize) {
        gameRow = []
        for (let x = 0; x < canvas.width; x += cellSize) {
            gameRow.push(new Cell(x, y));
        }
        gameGrid.push(gameRow)
        // console.log(gameGrid[1][2])
    }
// The commented out code is an example of how the game grid can access different cells, the first index refers to the row, the second
// refers to the column
}

createGrid();

// This function iterates over each row (gameRow) in the gameGrid.
function handleGameGrid() {
    gameGrid.forEach(function(gameRow) {
        gameRow.forEach(function(cell) {
            cell.draw()
        })
    })
    // for (let i = 0; i < gameGrid.length; i++) {
    //    gameGrid[i].draw()
    }
// The commented-out code above is an alternative way to achieve the same result using a traditional for loop.
    // It loops through each element in gameGrid (which represents a row) and calls the draw method for each cell.
    // However, using forEach is a concise and more modern approach.

canvas.addEventListener('click', function(){
    const gridPositionX = mouse.x  - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    if (gridPositionY < cellSize) return;
    for (let i = 0; i < defenders.length; i++){
        if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return;
    }
    defenders.push(new Defender(gridPositionX, gridPositionY));
});


function animate() {
    // this clears the cell, so only the highlighted cell will be shown
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 0, controlsBarTop.width, controlsBarTop.height)

    handleDefenders()
    handleGameGrid()

    ctx.clearRect(0, 500, canvas.width, canvas.height)
    ctx.fillStyle = "pink"
    ctx.fillRect(0, 500, controlsBarBottom.width, controlsBarBottom.height)
    
    
// playing around with putting a score in the top part
    ctx.fillStyle = "black"
    ctx.font = "20px Arial"
    ctx.fillText(`${sometext}`, 20, 50)
// -----------------------------------------

    requestAnimationFrame(animate)
}

animate();

// detects collisions between two rectangles
function collision(first, second) {
    if (!(first.x > second.x + second.width || first.x +first.width < second.x || first.y > second.y + second.height ||
    first.y + first.height < second.y)) {
        return true
    }
}