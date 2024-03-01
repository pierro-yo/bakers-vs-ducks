const Defender = require('./defenders'); // Assuming Defender is in the same directory

describe('Defender class', () => {
  let defender;

  beforeEach(() => {
    defender = new Defender(100, 200); // Example coordinates
  });

  test('constructor initializes properties correctly', () => {
    expect(defender.x).toBe(100);
    expect(defender.y).toBe(200);
    expect(defender.width).toBe(cellSize - cellGap * 2);
    expect(defender.height).toBe(cellSize - cellGap * 2);
    expect(defender.shooting).toBe(false);
    expect(defender.health).toBe(100);
    expect(defender.projectiles).toEqual([]);
    expect(defender.timer).toBe(0);
    expect(defender.image.src).toBe("../../images/entityImages/baguetteBazooka100.png");
  });

  test('draw method draws the defender', () => {
    const ctx = {
      drawImage: jest.fn(),
      fillStyle: '',
      font: '',
      fillText: jest.fn(),
    };

    defender.draw(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(defender.image, defender.x, defender.y, defender.width, defender.height);
    expect(ctx.fillText).toHaveBeenCalledWith(Math.floor(defender.health), defender.x + 15, defender.y + 30);
  });

  test('update method updates the defender', () => {
    // Mock the Projectile class for testing
    class MockProjectile {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }

    global.projectiles = []; // Mock the global projectiles array

    // Set up defender to be shooting
    defender.shooting = true;

    // Call update method
    defender.update();

    // Check if a projectile has been added to the projectiles array
    expect(global.projectiles).toEqual([new MockProjectile(defender.x + 70, defender.y + 50)]);
  });
});