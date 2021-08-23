
function runBattle(player: Character, tm: tiles.TileMapData) {
    scene.setTileMapLevel(tm)

    for (const sprite of sprites.allOfKind(SpriteKind.Enemy)) {
        getCharacterData(sprite).destroy();
    }
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, player.sprite).value = 9999;

    const enemyTiles = [
        assets.tile`bad guy 1`,
        assets.tile`bad guy 2`,
        assets.tile`bad guy 3`,
        assets.tile`bad guy 4`,
        assets.tile`bad guy 5`,
        assets.tile`bad guy 6`,
    ]

    tiles.placeOnRandomTile(player.sprite, assets.tile`player start`);

    const enemies: Character[] = [];
    let enemySpawns: tiles.Location[] = [];

    for (const tile of enemyTiles) {
        enemySpawns = enemySpawns.concat(tiles.getTilesByType(tile));
        tiles.coverAllTiles(tile, assets.tile`myTile1`)
    }

    tiles.coverAllTiles(assets.tile`player start`, assets.tile`myTile1`)

    for (const tile of enemySpawns) {
        enemies.push(createEnemyAtLocation(tile));
    }
    
    scene.centerCameraAt(88, 68);
    player.heading = 270;


    const renderer = new ScriptRenderer(player);
    let battleComplete = false;
    registerRendererControls(renderer, startScript);

    function startScript() {
        let cancellationToken = () => battleComplete;
        control.runInParallel(() => {
            player.execute(cancellationToken);
        });

        for (const enemy of enemies) {
            control.runInParallel(() => {
                enemy.execute(cancellationToken);
            });
        }
    }

    pauseUntil(() => sprites.allOfKind(SpriteKind.Enemy).length === 0);
    battleComplete = true;

    renderer.destroy();

    let rewardsSelected = false;

    const currrentBlocks = player.script.bag.concat(player.script.current);

    const rewards = new RewardScreen([
        getRandomBlock(currrentBlocks),
        getRandomBlock(currrentBlocks),
        Math.percentChance(50) ? getRandomBlock(currrentBlocks) : getArtifact(availableRewards[Math.randomRange(0, availableRewards.length - 1)])
    ]);

    registerRendererControls(rewards, () => rewardsSelected = true);
    pauseUntil(() => rewardsSelected)

    const reward = rewards.rewards[rewards.currIndex];

    if ((reward as any).duration) {
        player.script.held = (reward as any as Block);
    }
    else {
        const modifier = (reward as any as Artifact).modifier;
        player.setModifier(modifier, true);
    }

    rewards.destroy();
}