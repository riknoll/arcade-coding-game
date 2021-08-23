const INVINCIBILITY_TIME = 500;

sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyAttack, onAttackOverlap);
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerAttack, onAttackOverlap);
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyArrow, onAttackOverlap);
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerArrow, onAttackOverlap);

scene.onHitWall(SpriteKind.PlayerArrow, onArrowHitWall)
scene.onHitWall(SpriteKind.EnemyArrow, onArrowHitWall)
scene.onHitWall(SpriteKind.Player, onCharacterHitWall)
scene.onHitWall(SpriteKind.Enemy, onCharacterHitWall)

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
        case BlockKind.IceSpell:
            damage = 1;
            invincibleTime = 10;
            break;
        case BlockKind.LightningSpell:
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