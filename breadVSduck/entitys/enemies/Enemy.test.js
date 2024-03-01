const Enemy = require('./Enemy'); // Adjust the import statement based on your project structure

describe('Enemy class', () => {
  let enemy;

  beforeEach(() => {
    enemy = new Enemy(300); // Example verticalPosition
  });

  test('constructor initializes properties correctly', () => {
    expect(enemy.x).toBe(canvas.width);
    expect(enemy.y).toBe(300);
    expect(enemy.width).toBe(cellSize - cellGap * 2);
    expect(enemy.height).toBe(cellSize - cellGap * 2);
    expect(enemy.speed).toBeGreaterThanOrEqual(0.4);
    expect(enemy.speed).toBeLessThanOrEqual(0.6); // Assuming Math.random() * 0.2 + 0.4
    expect(enemy.movement).toBe(enemy.speed);
    expect(enemy.health).toBe(50);
    expect(enemy.maxHealth).toBe(50);
    expect(enemy.image.src).toBe("../../images/entityImages/duckWithCone.png");
  });

  test('update method updates the enemy position', () => {
    const initialX = enemy.x;

    enemy.update();

    expect(enemy.x).toBeLessThan(initialX); // The x position should decrease after update
  });

  test('draw method draws the enemy', () => {
    const ctx = {
      drawImage: jest.fn(),
      fillStyle: '',
      font: '',
      fillText: jest.fn(),
    };

    enemy.draw(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
    expect(ctx.fillText).toHaveBeenCalledWith(Math.floor(enemy.health), enemy.x + 15, enemy.y + 30);
  });
});