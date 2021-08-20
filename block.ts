enum BlockKind {
    MoveForward,
    MoveBackward,
    MoveLeft,
    MoveRight,
    TurnClockwise,
    TurnCounterClockwise,
    TurnRandom,
    MeleeAttack,
    RangedAttack,
    FireSpell,
    IceSpell,
    LightningSpell,
    Guard,
    Wait,
    TimesTwo,
    TimesThree,
    TimesFour,
    Aim
}

class Block {
    icon: Image;
    description: string;
    _duration: number;

    get duration() {
        return (this._duration * scriptTimeModifier) | 0
    }

    set duration(val: number) {
        this._duration = val;
    }

    constructor(public kind: BlockKind) { }
}

function makeBlock(kind: BlockKind, icon: Image, description: string, duration: number) {
    const result = new Block(kind);
    result.icon = icon;
    result.description = description;
    result.duration = duration;
    return result;
}

function getBlock(kind: BlockKind) {
    switch (kind) {
        case BlockKind.MoveForward:
            return makeBlock(
                kind,
                assets.image`moveForward`,
                "Move forward",
                800
            );
        case BlockKind.MoveLeft:
            return makeBlock(
                kind,
                assets.image`moveLeft`,
                "Move left",
                800
            );
        case BlockKind.MoveRight:
            return makeBlock(
                kind,
                assets.image`moveRight`,
                "Move right",
                800
            );
        case BlockKind.MoveBackward:
            return makeBlock(
                kind,
                assets.image`moveBack`,
                "Move backward",
                800
            );
        case BlockKind.TurnClockwise:
            return makeBlock(
                kind,
                assets.image`turnClockwise`,
                "Turn clockwise by 45 degrees",
                200
            );
        case BlockKind.TurnCounterClockwise:
            return makeBlock(
                kind,
                assets.image`turnCounterClockwise`,
                "Turn counter-clockwise by 45 degrees",
                200
            );
        case BlockKind.TurnRandom:
            return makeBlock(
                kind,
                assets.image`turnRandom`,
                "Turn in a random direction",
                200
            );
        case BlockKind.MeleeAttack:
            return makeBlock(
                kind,
                assets.image`melee`,
                "Use a melee attack",
                300
            );
        case BlockKind.RangedAttack:
            return makeBlock(
                kind,
                assets.image`arrow`,
                "Use a ranged attack",
                200
            );
        case BlockKind.FireSpell:
            return makeBlock(
                kind,
                assets.image`fireBall`,
                "Launch a fireball forwards",
                500
            );
        case BlockKind.IceSpell:
            return makeBlock(
                kind,
                assets.image`ice`,
                "Create an icy aura that damages enemies around you",
                500
            );
        case BlockKind.LightningSpell:
            return makeBlock(
                kind,
                assets.image`lightning`,
                "Launch a lightning strike that jumps between enemies",
                500
            );
        case BlockKind.Guard:
            return makeBlock(
                kind,
                assets.image`guard`,
                "Stand still and guard to reduce damage for one second",
                500
            );
        case BlockKind.Wait:
            return makeBlock(
                kind,
                assets.image`wait`,
                "Stand still for one second",
                500
            );
        case BlockKind.TimesTwo:
            return makeBlock(
                kind,
                assets.image`timesTwo`,
                "Execute the next action twice",
                100
            );
        case BlockKind.TimesThree:
            return makeBlock(
                kind,
                assets.image`timesThree`,
                "Execute the next action three times",
                100
            );
        case BlockKind.TimesFour:
            return makeBlock(
                kind,
                assets.image`timesFour`,
                "Execute the next action four times",
                100
            );
        case BlockKind.Aim:
            return makeBlock(
                kind,
                assets.image`aim`,
                "Rotate towards the nearest enemy",
                500
            );
    }
}
