
function runBattle(player: Character, enemies: Character[]) {
    scene.setTileMapLevel(assets.tilemap`level1`)
    scene.centerCameraAt(88, 68);
    player.sprite.x = 88;
    player.sprite.bottom = 104;
    player.heading = 270;


    const renderer = new ScriptRenderer(player);

    let battleComplete = false;
    let cancellationToken = () => battleComplete;

    control.runInParallel(() => {
        player.execute(cancellationToken)
    })

    for (const enemy of enemies) {
        control.runInParallel(() => {
            enemy.execute(cancellationToken);
        })
    }

    pauseUntil(() => sprites.allOfKind(SpriteKind.Enemy).length === 0);
    battleComplete = true;
}