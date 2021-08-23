
function createEnemyAtLocation(location: tiles.Location) {
    let enemy: Character;

    if (tiles.getTileImage(location).equals(assets.tile`bad guy 1`)) {
        enemy = createBadGuy1();
    }
    else if (tiles.getTileImage(location).equals(assets.tile`bad guy 2`)) {
        enemy = createBadGuy2();
    }
    else if (tiles.getTileImage(location).equals(assets.tile`bad guy 3`)) {
        enemy = createBadGuy3();
    }
    else if (tiles.getTileImage(location).equals(assets.tile`bad guy 4`)) {
        enemy = createBadGuy4();
    }
    else if (tiles.getTileImage(location).equals(assets.tile`bad guy 5`)) {
        enemy = createBadGuy5();
    }
    else if (tiles.getTileImage(location).equals(assets.tile`bad guy 6`)) {
        enemy = createBadGuy6();
    }

    tiles.placeOnTile(enemy.sprite, location);
    return enemy;
}

function createBadGuy1() {
    const enemy = new Character(true);
    enemy.heading = 90;
    enemy.script = new ScriptBag([
        getBlock(BlockKind.TurnRandom),
        getBlock(BlockKind.Wait),
        getBlock(BlockKind.RangedAttack)
    ]);

    return enemy;
}

function createBadGuy2() {
    const enemy = new Character(true);
    enemy.heading = 90;
    enemy.script = new ScriptBag([
        getBlock(BlockKind.TurnClockwise),
        getBlock(BlockKind.RangedAttack)
    ]);

    return enemy;
}

function createBadGuy3() {
    const enemy = new Character(true);
    enemy.heading = 90;
    enemy.script = new ScriptBag([
        getBlock(BlockKind.TurnClockwise),
        getBlock(BlockKind.RangedAttack)
    ]);

    return enemy;
}

function createBadGuy4() {
    const enemy = new Character(true);
    enemy.heading = 90;
    enemy.script = new ScriptBag([
        getBlock(BlockKind.TurnClockwise),
        getBlock(BlockKind.RangedAttack)
    ]);

    return enemy;
}

function createBadGuy5() {
    const enemy = new Character(true);
    enemy.heading = 90;
    enemy.script = new ScriptBag([
        getBlock(BlockKind.TurnClockwise),
        getBlock(BlockKind.RangedAttack)
    ]);

    return enemy;
}

function createBadGuy6() {
    const enemy = new Character(true);
    enemy.heading = 90;
    enemy.script = new ScriptBag([
        getBlock(BlockKind.TurnClockwise),
        getBlock(BlockKind.RangedAttack)
    ]);

    return enemy;
}