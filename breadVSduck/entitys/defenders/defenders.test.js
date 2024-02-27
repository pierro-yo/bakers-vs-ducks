const Defender = require('./defenders');

describe('Defender Class', () => {
    test('Defender should be initialized with correct properties', () => {
        const defender = new Defender(50, 50);

        expect(defender.x).toBe(50);
        expect(defender.y).toBe(50);
        expect(defender.width).toBeGreaterThan(0);
        expect(defender.height).toBeGreaterThan(0);
        expect(defender.shooting).toBe(false);
        expect(defender.health).toBe(100);
        expect(defender.projectiles).toEqual([]);
        expect(defender.timer).toBe(0);
    });

    test('Draw method should be defined', () => {
        const defender = new Defender(50, 50);

        expect(defender.draw).toBeDefined();
    });
});