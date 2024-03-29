const canvas = document.getElementById('canvasHome')
const ctx = canvas.getContext('2d')
canvas.width = 900
canvas.height = 600


// Each cell row will be 100px wide and 100px tall
const cellSize = 100   
const cellGap = 3

// Controls Bar
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

function controlBarSetUp() {
    // This sets up the control bar at the top of the homepage canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(245 222 179 / 75%)"
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height)

    // This adds text to the control bar at the top of the homepage canvas
    var textTitle = "Bakers vs Ducks"
    textWidth = ctx.measureText(textTitle).width
    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "rgb(95 95 95)";
    ctx.textAlign = "center";
    ctx.fillText(textTitle, (canvas.width/2), controlsBar.height/2 + 15);
    requestAnimationFrame(animate)
}

controlBarSetUp()

