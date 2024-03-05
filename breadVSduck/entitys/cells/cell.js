// creates one new cell by taking two arguments of horizontal and vertical values
class Cell {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = cellSize -1
        this.height = cellSize -1
    }
// takes the arguments of horizontal and vertical values creates a rectangle of that size at the given coordinates
    draw() {
        if (mouse.x && mouse.y && collision(this, mouse)) {
            ctx.strokeStyle = "white"
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        }
    }  
}
