
let scriptTimeModifier = 0.5;

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

const enemy = new Character(true);
enemy.script = [
    getBlock(BlockKind.TurnClockwise),
    getBlock(BlockKind.RangedAttack),
]

runBattle(player, [enemy]);
