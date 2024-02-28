function animate() {
    // this clears the cell, so only the highlighted cell will be shown
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height)
    handleGameGrid();
    // handleEnemies();
    //handleDefenders();
    // handleProjectiles();
    frame++;
    console.log(frame);
    requestAnimationFrame(animate)
}