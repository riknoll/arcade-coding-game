const INVINCIBILITY_TIME = 500;

sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyAttack, onAttackOverlap);
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerAttack, onAttackOverlap);
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyArrow, onAttackOverlap);
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerArrow, onAttackOverlap);
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerFireball, onFireballOverlap);
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyFireball, onFireballOverlap);
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerLightning, onLightningOverlap);
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyLightning, onLightningOverlap);

scene.onHitWall(SpriteKind.PlayerArrow, onArrowHitWall)
scene.onHitWall(SpriteKind.EnemyArrow, onArrowHitWall)
scene.onHitWall(SpriteKind.Player, onCharacterHitWall)
scene.onHitWall(SpriteKind.Enemy, onCharacterHitWall)
scene.onHitWall(SpriteKind.PlayerFireball, onFireballHitsWall)
scene.onHitWall(SpriteKind.EnemyFireball, onFireballHitsWall)
scene.onHitWall(SpriteKind.PlayerLightning, onLightningHitsWall)
scene.onHitWall(SpriteKind.EnemyLightning, onLightningHitsWall)

statusbars.onZero(StatusBarKind.Health, status => {
    const sprite = status.spriteAttachedTo();
    const character = getCharacterData(sprite);

    if (character.isEnemy)
        sprite.destroy();
})


function onAttackOverlap(attacked: Sprite, attack: Sprite) {
    const attacker = getCharacterData(attack);
    dealDamage(
        attacker,
        getCharacterData(attacked),
        attack.data["action"],
        Math.atan2(attack.y - attacked.y, attack.x - attacked.x)
    );
    if (attack.data["arrow"]) attack.destroy();
}

function onFireballOverlap(attacked: Sprite, fireball: Sprite) {
    onFireballHitsWall(fireball);
}

function onFireballHitsWall(fireball: Sprite) {
    const attacker = getCharacterData(fireball);
    fireball.destroy();
    const explosion = sprites.create(assets.image`fireExplosion`, attacker.isEnemy ? SpriteKind.EnemyAttack : SpriteKind.PlayerAttack);
    explosion.data["action"] = fireball.data["action"];
    explosion.x = fireball.x;
    explosion.y = fireball.y;
    explosion.lifespan = 500;
}


function onLightningOverlap(attacked: Sprite, bolt: Sprite) {
    dealDamage(
        getCharacterData(bolt),
        getCharacterData(attacked),
        bolt.data["action"],
        Math.atan2(bolt.y - attacked.y, bolt.x - attacked.x)
    );
    bolt.destroy();

    const character = getCharacterData(bolt);

    let alreadyHit = [attacked]
    if (bolt.data["alreadyHit"]) {
        alreadyHit = (bolt.data["alreadyHit"] as Sprite[]).concat(alreadyHit);
    }

    let prev = character.sprite;
    for (const a of alreadyHit) {
        createLightningSprite(500, prev.x, prev.y, a.x, a.y);
        prev = a;
    }
    
    if (bolt.data["chain"] === 0) return;

    const newTarget = findClosestSprite(attacked, sprites.allOfKind(attacked.kind()).filter(a => alreadyHit.indexOf(a) === -1))
    if (!newTarget) return;

    const angle = Math.atan2(-attacked.y + newTarget.y, -attacked.x + newTarget.x);

    const lightning = sprites.create(assets.image`fireProjectile`, character.isEnemy ? SpriteKind.EnemyLightning : SpriteKind.PlayerLightning);
    lightning.setVelocity(
        500 * Math.cos(angle),
        500 * Math.sin(angle)
    );
    lightning.x = attacked.x + 10 * Math.cos(angle);
    lightning.y = attacked.y + 10 * Math.sin(angle);
    lightning.data["character"] = character;
    lightning.data["action"] = bolt.data["action"];
    lightning.data["chain"] = bolt.data["chain"] - 1;
    lightning.data["alreadyHit"] = alreadyHit;
    lightning.setFlag(SpriteFlag.Invisible, true);
    lightning.setFlag(SpriteFlag.AutoDestroy, true);
    lightning.setFlag(SpriteFlag.GhostThroughWalls, true);
}

function onLightningHitsWall(bolt: Sprite) {
    bolt.destroy();
}

function dealDamage(attacker: Character, attacked: Character, action: Block, angle: number) {
    if (control.millis() < attacked.invincibleEndTime) return;
    
    let damage = 0;
    let invincibleTime = INVINCIBILITY_TIME;

    switch (action.kind) {
        case BlockKind.MeleeAttack:
            damage = 20;
            break;
        case BlockKind.RangedAttack:
            damage = 5;
            break;
        case BlockKind.FireSpell:
            damage = 20;
            break;
        case BlockKind.IceSpell:
            damage = 1;
            invincibleTime = 10;
            break;
        case BlockKind.LightningSpell:
            damage = 5;
            break;
    }

    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, attacked.sprite).value -= damage;
    attacked.invincibleEndTime = control.millis() + invincibleTime * scriptTimeModifier;
}

function onArrowHitWall(arrow: Sprite) {
    const character = getCharacterData(arrow);
    if (character.hasModifier(Modifier.BouncyArrows)) {
        arrow.data["remainingBounces"] -= 1;

        if (!arrow.data["remainingBounces"]){
            arrow.destroy();
            return;
        }

        if (arrow.isHittingTile(CollisionDirection.Left) || arrow.isHittingTile(CollisionDirection.Right)) arrow.vx = -arrow.vx;
        if (arrow.isHittingTile(CollisionDirection.Top) || arrow.isHittingTile(CollisionDirection.Bottom)) arrow.vy = -arrow.vy;

        (arrow.data["arrow"] as Arrow).heading = Math.atan2(arrow.vy, arrow.vx) * 180 / Math.PI;
    }
    else {
        arrow.destroy();
    }
}

function onCharacterHitWall(sprite: Sprite) {
    const character = getCharacterData(sprite);
    if (character.hasModifier(Modifier.DeflectOnWalls)) {
        if (sprite.isHittingTile(CollisionDirection.Left) || sprite.isHittingTile(CollisionDirection.Right)) sprite.vx = -sprite.vx;
        if (sprite.isHittingTile(CollisionDirection.Top) || sprite.isHittingTile(CollisionDirection.Bottom)) sprite.vy = -sprite.vy;

        character.heading = Math.atan2(sprite.vy, sprite.vx) * 180 / Math.PI;
    }
}