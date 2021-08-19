
let scriptTimeModifier = 0.5;

const c = new Character(false);

const script = [
    getBlock(BlockKind.TurnClockwise),
    getBlock(BlockKind.TurnClockwise),
    getBlock(BlockKind.MoveForward),
    getBlock(BlockKind.MoveLeft),
    getBlock(BlockKind.MoveRight),
    getBlock(BlockKind.MoveBackward),
    getBlock(BlockKind.MeleeAttack),
    getBlock(BlockKind.TurnCounterClockwise),
]
scene.setBackgroundColor(13)

const scriptRenderer = new ScriptRenderer(script);

while (true) {
    scriptRenderer.execute(c);
}