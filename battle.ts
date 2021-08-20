
function runBattle(player: Character, tm: tiles.TileMapData) {
    scene.setTileMapLevel(tm)

    for (const sprite of sprites.allOfKind(SpriteKind.Enemy)) {
        getCharacterData(sprite).destroy();
    }
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, player.sprite).value = 9999;

    tiles.placeOnRandomTile(player.sprite, assets.tile`player start`);

    const enemies: Character[] = [];

    const enemySpawns = tiles.getTilesByType(assets.tile`bad guy 1`)
        .concat(tiles.getTilesByType(assets.tile`bad guy 2`))
        .concat(tiles.getTilesByType(assets.tile`bad guy 3`))
        .concat(tiles.getTilesByType(assets.tile`bad guy 4`))
        .concat(tiles.getTilesByType(assets.tile`bad guy 5`))
        .concat(tiles.getTilesByType(assets.tile`bad guy 6`))

    for (const tile of enemySpawns) {
        enemies.push(createEnemyAtLocation(tile));
    }



    
    scene.centerCameraAt(88, 68);
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