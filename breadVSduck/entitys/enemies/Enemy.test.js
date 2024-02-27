const Enemy = require('./Enemy');

describe('Enemy Class', () => {
    test('Enemy should be initialized with correct properties', () => {
        const enemy = new Enemy(100);

        expect(enemy.x).toBeGreaterThan(0);
        expect(enemy.y).toBe(100);
        expect(enemy.width).toBeGreaterThan(0);
        expect(enemy.height).toBeGreaterThan(0);
        expect(enemy.speed).toBeGreaterThan(0);
        expect(enemy.movement).toBeGreaterThan(0);
        expect(enemy.health).toBe(50);
        expect(enemy.maxHealth).toBe(50);
    });

    test('Draw method should be defined', () => {
        const enemy = new Enemy(100);

        expect(enemy.draw).toBeDefined();
    });
});