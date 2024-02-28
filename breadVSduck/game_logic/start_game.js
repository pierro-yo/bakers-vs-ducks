function init(){
    for (let y = cellSize; y < canvas.height; y += cellSize){
    for (let x = 0; x < canvas.width; x += cellSize){
        gameGrid.push(new Cell(x, y));
    } 
}
}
init();