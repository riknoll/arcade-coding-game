function executeAction(character: Character, action: Block) {
    switch (action.kind) {
        case BlockKind.MoveForward:
        case BlockKind.MoveLeft:
        case BlockKind.MoveRight:
        case BlockKind.MoveBackward:
            executeMove(character, action);
            break;
        case BlockKind.TurnClockwise:
        case BlockKind.TurnCounterClockwise:
        case BlockKind.TurnRandom:
        case BlockKind.Aim:
            executeTurn(character, action);
            break;
        case BlockKind.MeleeAttack:
            executeMeleeAttack(character, action);
            break;
        case BlockKind.RangedAttack:
            executeRangedAttack(character, action);
            break;
        case BlockKind.FireSpell:
            executeFireSpell(character, action);
            break;
        case BlockKind.IceSpell:
            executeIceSpell(character, action);
            break;
        case BlockKind.LightningSpell:
            executeLightningSpell(character, action);
            break;
        case BlockKind.Guard:
            executeGuard(character, action);
            break;
        case BlockKind.Wait:
            executeWait(character, action);
            break;
        case BlockKind.TimesTwo:
        case BlockKind.TimesThree:
        case BlockKind.TimesFour:
            executeMultiplier(character, action);
            break;
    }
}

function executeMove(character: Character, action: Block) {
    let angle: number;

    switch (action.kind) {
        case BlockKind.MoveForward:
            angle = character.heading;
            break;
        case BlockKind.MoveLeft:
            angle = character.heading - 90;
            break;
        case BlockKind.MoveRight:
            angle = character.heading + 90;
            break;
        case BlockKind.MoveBackward:
            angle = character.heading + 180;
            break;
    }

    const distance = 16;
    const duration = character.hasModifier(Modifier.FastMove) ? action.duration / 2 : action.duration;
    const speed = distance / (duration / 1000);
    angle = toRadians(angle);

    character.sprite.vx = Math.cos(angle) * speed;
    character.sprite.vy = Math.sin(angle) * speed;
    pause(duration);
    character.sprite.vx = 0;
    character.sprite.vy = 0;
}

function executeTurn(character: Character, action: Block) {
    let targetAngle: number;

    character.heading = normalizeAngle(character.heading);

    switch (action.kind) {
        case BlockKind.TurnClockwise:
            targetAngle = character.heading + 45;
            break;
        case BlockKind.TurnCounterClockwise:
            targetAngle = character.heading - 45;
            break;
        case BlockKind.TurnRandom:
            targetAngle = character.heading + Math.randomRange(-60, 60);
            break;
        case BlockKind.Aim:
            const target = findClosestSprite(character.sprite, sprites.allOfKind(character.isEnemy ? SpriteKind.Player : SpriteKind.Enemy))
            targetAngle = Math.atan2(target.y - character.sprite.y, target.x - character.sprite.x) * 180 / Math.PI;
            break;
    }

    targetAngle = normalizeAngle(targetAngle);

    if (Math.abs(targetAngle - character.heading) > 180) {
        if (targetAngle < character.heading) {
            targetAngle += 360;
        }
        else {
            character.heading += 360
        }
    }

    const steps = 10;
    const slice = (targetAngle - character.heading) / steps;
    const duration = character.hasModifier(Modifier.FastTurn) ? action.duration / 2 : action.duration;
    const pauseLength = duration/ steps;

    for (let i = 0; i < steps; i++) {
        character.heading += slice;
        pause(pauseLength)
    }
    character.heading = normalizeAngle(targetAngle);
}

function executeMeleeAttack(character: Character, action: Block) {
    const sweep = character.hasModifier(Modifier.SpinAttack) ? 360 : 140;
    const steps = character.hasModifier(Modifier.SpinAttack) ? 40 : 20;
    const duration = character.hasModifier(Modifier.SpinAttack) ? action.duration * 1.5 : action.duration;
    const slice = toRadians(sweep / steps);
    const pauseLength = duration / steps;

    const ox = character.attackImage.width >> 1;
    const oy = character.attackImage.height >> 1;
    const handleOffset = toRadians(21);

    const radius = character.hasModifier(Modifier.ExtendedMelee) ? 23 : 15;

    let angle = toRadians(character.heading - (sweep >> 1));
    for (let i = 0; i < steps; i++) {
        // Blade
        drawThickLine(
            character.attackImage,
            ox + Math.cos(angle) * 9,
            oy + Math.sin(angle) * 9,
            ox + Math.cos(angle) * radius,
            oy + Math.sin(angle) * radius,
            1
        );

        // Handle
        character.attackImage.drawLine(
            ox + Math.cos(angle) * 4,
            oy + Math.sin(angle) * 4,
            ox + Math.cos(angle) * 8,
            oy + Math.sin(angle) * 8,
            character.hasModifier(Modifier.ExtendedMelee) ? 14 : 8
        );

        // Hand guard
        character.attackImage.drawLine(
            ox + Math.cos(angle - handleOffset) * 8,
            oy + Math.sin(angle - handleOffset) * 8,
            ox + Math.cos(angle + handleOffset) * 8,
            oy + Math.sin(angle + handleOffset) * 8,
            character.hasModifier(Modifier.ExtendedMelee) ? 14 : 8
        );


        angle += slice;
        pause(pauseLength);
        character.attackImage.fill(0);
    }
}

function executeRangedAttack(character: Character, action: Block) {
    const arrow = new Arrow(character, 40 / scriptTimeModifier);
    pause(action.duration);
}

function executeFireSpell(character: Character, action: Block) {

}

function executeIceSpell(character: Character, action: Block) {
    character.attackImage.fillCircle(
        character.attackImage.width >> 1,
        character.attackImage.height >> 1,
        character.attackImage.width >> 1,
        8
    );
    character.attackImage.fillCircle(
        character.attackImage.width >> 1,
        character.attackImage.height >> 1,
        (character.attackImage.width >> 1) - 2,
        9
    );
    character.sprite.startEffect(effects.blizzard, action.duration * scriptTimeModifier)
    character.attackSprite.z
    pause(action.duration * scriptTimeModifier);
    character.attackImage.fill(0);
}

function executeLightningSpell(character: Character, action: Block) {

}

function executeGuard(character: Character, action: Block) {
    character.invincibleEndTime += action.duration;
    pause(action.duration);
}

function executeWait(character: Character, action: Block) {
    pause(action.duration);
}

function executeMultiplier(character: Character, action: Block) {
    character.repeats = character.repeats || 1;
    switch (action.kind) {
        case BlockKind.TimesTwo:
            character.repeats += 1;
            break;
        case BlockKind.TimesThree:
            character.repeats += 2;
            break;
        case BlockKind.TimesFour:
            character.repeats += 3;
            break;
    }

    pause(action.duration);
}