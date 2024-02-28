const canvas = document.getElementById('canvasHome')
const ctx = canvas.getContext('2d')
canvas.width = 900
canvas.height = 600


// Each cell row will be 100px wide and 100px tall
const cellSize = 100   
const cellGap = 3

let canvasPosition = canvas.getBoundingClientRect();
// returns a dom object relative to the position and size on the canvas
// this is used for knowing where the mouse is on the canvas

// game board
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

function animate() {
    // this clears the cell, so only the highlighted cell will be shown
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height)
    var textTitle = "Bread vs Ducks"
    textWidth = ctx.measureText(textTitle).width

    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(textTitle, (canvas.width/2), controlsBar.height/2);
    requestAnimationFrame(animate)
}

animate()

