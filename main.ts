
let scriptTimeModifier = 1;

scene.setBackgroundColor(13)


const player = new Character(false);
player.script = new ScriptBag([
    getBlock(BlockKind.MoveForward),
    getBlock(BlockKind.MeleeAttack),
    getBlock(BlockKind.RangedAttack),
    getBlock(BlockKind.TurnRandom),
]);

player.setModifier(Modifier.DeflectOnWalls, true);
player.setModifier(Modifier.BouncyArrows, false);



const levels = [
    assets.tilemap`level1`,
    assets.tilemap`level2`,
    assets.tilemap`level3`,
    assets.tilemap`level4`,
    assets.tilemap`level5`,
]

control.runInParallel(() => {
    for (const level of levels) {
        runBattle(player, level);
    }
})


controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
    scriptTimeModifier -= 0.1;

    if (scriptTimeModifier < 0.1) scriptTimeModifier = 0.1
})

controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
    scriptTimeModifier += 0.1;
})
