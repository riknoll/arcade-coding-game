
let scriptTimeModifier = 2;

scene.setBackgroundColor(13)


const player = new Character(false);
player.script = [
    getBlock(BlockKind.TurnClockwise),
    getBlock(BlockKind.TurnClockwise),
    getBlock(BlockKind.MoveForward),
    getBlock(BlockKind.MoveLeft),
    getBlock(BlockKind.MoveRight),
    getBlock(BlockKind.MoveBackward),
    getBlock(BlockKind.MeleeAttack),
    getBlock(BlockKind.RangedAttack),
    getBlock(BlockKind.TurnCounterClockwise),
];

player.setModifier(Modifier.DeflectOnWalls, true);

runBattle(player, assets.tilemap`level1`);
