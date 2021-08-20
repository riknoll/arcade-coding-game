const INVINCIBILITY_TIME = 500;

sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyAttack, (attacked, attack) => {
    const attacker = getCharacterData(attack);
    dealDamage(
        attacker,
        getCharacterData(attacked),
        attacker.currentAction,
        Math.atan2(attack.y - attacked.y, attack.x - attacked.x)
    );
});

sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerAttack, (attacked, attack) => {
    const attacker = getCharacterData(attack);
    dealDamage(
        attacker,
        getCharacterData(attacked),
        attacker.currentAction,
        Math.atan2(attack.y - attacked.y, attack.x - attacked.x)
    );
});

sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyArrow, (attacked, attack) => {
    const attacker = getCharacterData(attack);
    dealDamage(
        attacker,
        getCharacterData(attacked),
        attack.data["action"],
        Math.atan2(attack.y - attacked.y, attack.x - attacked.x)
    );
    attack.destroy();
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.PlayerArrow, (attacked, attack) => {
    const attacker = getCharacterData(attack);
    dealDamage(
        attacker,
        getCharacterData(attacked),
        attack.data["action"],
        Math.atan2(attack.y - attacked.y, attack.x - attacked.x)
    );
    attack.destroy();
})


function dealDamage(attacker: Character, attacked: Character, action: Block, angle: number) {
    if (control.millis() < attacked.invincibleEndTime) return;
    
    let damage = 0;

    switch (action.kind) {
        case BlockKind.MeleeAttack:
            damage = 5;
            break;
        case BlockKind.RangedAttack:
            damage = 5;
            break;
        case BlockKind.FireSpell:
        case BlockKind.IceSpell:
        case BlockKind.LightningSpell:
    }

    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, attacked.sprite).value -= damage;
    attacked.invincibleEndTime = control.millis() + INVINCIBILITY_TIME * scriptTimeModifier;
}